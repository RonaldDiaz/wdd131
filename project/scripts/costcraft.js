const hambutton = document.querySelector("#menu");
const navigation = document.querySelector("#primaryNav");
const year = document.querySelector("#currentYear");
const currentYear = new Date().getFullYear();
year.innerHTML = currentYear;

hambutton.addEventListener("click", () => {
    hambutton.classList.toggle("open");
    navigation.classList.toggle("open");
    const isOpen = hambutton.classList.contains("open");
    hambutton.setAttribute("aria-expanded", isOpen ? "true" : "false");
})

const isCalculatorPage = document.querySelector("#matTable");
const isContactPage = document.querySelector("#form");

if (isCalculatorPage) {
    initCalculator();
}

if (isContactPage) {
    initContactForm();
}
function initCalculator() {
    const btnAdd = document.querySelector("#btnAddMaterial");
    const btnReset = document.querySelector("#btnReset");
    const btnSave = document.querySelector("#btnSave");
    const tableBody = document.querySelector("#matTable");
    const matNameInput = document.querySelector("#matName");
    const matCostInput = document.querySelector("#matCost");
    const matQuantityInput = document.querySelector("#matQuantity");
    const matMessage = document.querySelector("#materialMessage");
    const hourlyRateInput = document.querySelector("#hourlyRate");
    const laborHoursInput = document.querySelector("#laborHours");
    const batchSizeInput = document.querySelector("#batchSize");
    const overheadInput = document.querySelector("#overhead");
    const marginSlider = document.querySelector("#profitMargin");
    const marginValLabel = document.querySelector("#marginVal");
    const projectNameInput = document.querySelector("#projectName");
    const saveMessage = document.querySelector("#saveMessage");
    const savedProductsList = document.querySelector("#savedProductsList");

    let materials = [];
    let savedProducts = {};

    const savedMaterialsJson = localStorage.getItem("costCraft_currentMaterials");
    const savedProductsJson = localStorage.getItem("costCraft_productProfiles");

    if (savedMaterialsJson) {
        materials = JSON.parse(savedMaterialsJson);
    }

    if (savedProductsJson) {
        savedProducts = JSON.parse(savedProductsJson);
    }

    const cachedInputsJson = localStorage.getItem("costCraft_inputsCache");
    let cached = {};

    if (cachedInputsJson) {
        cached = JSON.parse(cachedInputsJson);
    }

    projectNameInput.value = cached.projectName || "My Product";
    hourlyRateInput.value = cached.hourlyRate || "15.00";
    laborHoursInput.value = cached.laborHours || "1.00";
    batchSizeInput.value = cached.batchSize || "1";
    overheadInput.value = cached.overhead || "0.00";
    marginSlider.value = cached.margin || "30";

    populateMaterialsTable();
    populateSavedProductsList();
    updateCalculations();

    const inputList = [projectNameInput, hourlyRateInput, laborHoursInput, batchSizeInput, overheadInput]
    inputList.forEach(input => {
        input.addEventListener("input", function() {
            cacheInputsState();
            updateCalculations();
        });
    });

    marginSlider.addEventListener("input", (e) => {
        const value = e.target.value;
        marginValLabel.textContent = `${value}%`;
        cacheInputsState();
        updateCalculations();
    });

    btnAdd.addEventListener("click", function() {
        const name = matNameInput.value.trim();
        const cost = parseFloat(matCostInput.value);
        const quantity = matQuantityInput.value.trim();

        matMessage.textContent = "";

        if (!name) {
            matMessage.textContent = "Please enter a material name.";
            return;
        }
            if (isNaN(cost) || cost < 0) {
            matMessage.textContent = "Please enter a valid cost (0 or higher).";
            return;
        }
            if (!quantity) {
            matMessage.textContent = "Please enter the quantity (e.g. 500g, 1 unit).";
            return;
        }

        const newMaterial = {
            id: Date.now().toString(),
            name: name,
            cost: cost,
            qtyDetail: quantity
        };

        materials.push(newMaterial);
        localStorage.setItem("costCraft_currentMaterials", JSON.stringify(materials));
        matNameInput.value = "";
        matCostInput.value = "";
        matQuantityInput.value = "";

        populateMaterialsTable();
        updateCalculations();
    });

    tableBody.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete");
        if (!deleteBtn) return;
        const idToDelete = deleteBtn.getAttribute("data-id");
        materials = materials.filter(item => item.id !== idToDelete);

        localStorage.setItem("costCraft_currentMaterials", JSON.stringify(materials));
        populateMaterialsTable();
        updateCalculations();
    });

    btnReset.addEventListener("click", function() {
        materials = [];
        localStorage.removeItem("costCraft_currentMaterials");
        localStorage.removeItem("costCraft_inputsCache");

        projectNameInput.value = "My Product";
        hourlyRateInput.value = "15.00";
        laborHoursInput.value = "1.00";
        batchSizeInput.value = "1";
        overheadInput.value = "0.00";
        marginSlider.value = "30";
        marginValLabel.textContent = "30%";
        matMessage.textContent = "";
        saveMessage.textContent = "";

        populateMaterialsTable();
        updateCalculations();
    });

    btnSave.addEventListener("click", () => {
        const pName = projectNameInput.value.trim();
        if (!pName) {
            showSaveMessage("Please enter a product name before saving.", "danger");
            return;
        }

        savedProducts[pName] = {
            projectName: pName,
            hourlyRate: hourlyRateInput.value,
            laborHours: laborHoursInput.value,
            batchSize: batchSizeInput.value,
            overhead: overheadInput.value,
            margin: marginSlider.value,
            materials: [...materials]
        };

        localStorage.setItem("costCraft_productProfiles", JSON.stringify(savedProducts));
        populateSavedProductsList();
        showSaveMessage(`Product "${pName}" successfully saved!`, "success");
    });

    // Caching the input values in localStorage
    function cacheInputsState() {
        const inputsState = {
        projectName: projectNameInput.value,
        hourlyRate: hourlyRateInput.value,
        laborHours: laborHoursInput.value,
        batchSize: batchSizeInput.value,
        overhead: overheadInput.value,
        margin: marginSlider.value
        };
        localStorage.setItem("costCraft_inputsCache", JSON.stringify(inputsState));
    }

    // Populate the materials  rows
    function populateMaterialsTable() {        
        if (materials.length === 0) {
        tableBody.innerHTML = `
            <tr>
            <td colspan="4" class="empty-state">No materials added yet.</td>
            </tr>
        `;
        return;
        }

        let rowsHtml = "";
        materials.forEach(item => {
        rowsHtml += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qtyDetail}</td>
                <td>$${item.cost.toFixed(2)}</td>
                <td>
                    <button class="btn-delete" data-id="${item.id}" aria-label="Delete ${item.name}">
                    <img src="images/delete.svg" alt="Delete icon">
                    </button>
                </td>
            </tr>
        `;
        });

        tableBody.innerHTML = rowsHtml;
    }

    // Pricing calculations
    function updateCalculations() {
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
        const laborHours = parseFloat(laborHoursInput.value) || 0;
        const batchSize = parseInt(batchSizeInput.value) || 1;
        const overhead = parseFloat(overheadInput.value) || 0;
        const marginPercent = parseFloat(marginSlider.value) || 0;
        const totalMaterialsCost = materials.reduce((sum, item) => sum + item.cost, 0);
        const unitMaterials = totalMaterialsCost / batchSize;
        const totalLabor = hourlyRate * laborHours;
        const unitLabor = totalLabor / batchSize;
        const unitOverhead = overhead / batchSize;
    
        const unitCost = unitMaterials + unitLabor + unitOverhead;

        // suggested price = cost / (1 - (margin% / 100))
        let suggestedPrice = 0;
        let profitPerUnit = 0;
        let markupPercent = 0;

        // margin% can not be 100%.
        if (marginPercent < 100) {
            suggestedPrice = unitCost / (1 - (marginPercent / 100));
            profitPerUnit = suggestedPrice - unitCost;
            markupPercent = unitCost > 0 ? (profitPerUnit / unitCost) * 100 : 0;
        } else {
            suggestedPrice = unitCost;
            profitPerUnit = 0;
            markupPercent = 0;
        }

        document.querySelector("#resUnitMaterials").textContent = `$${unitMaterials.toFixed(2)}`;
        document.querySelector("#resUnitLabor").textContent = `$${unitLabor.toFixed(2)}`;
        document.querySelector("#resUnitOverhead").textContent = `$${unitOverhead.toFixed(2)}`;
        document.querySelector("#resUnitCost").textContent = `$${unitCost.toFixed(2)}`;
        document.querySelector("#resSuggestedPrice").textContent = `$${suggestedPrice.toFixed(2)}`;
        document.querySelector("#resMarkupPercent").textContent = `${markupPercent.toFixed(0)}%`;
        document.querySelector("#resProfitPerUnit").textContent = `$${profitPerUnit.toFixed(2)}`;
    }

    // populate the list of saved products
    function populateSavedProductsList() {
        const keys = Object.keys(savedProducts);
        if (keys.length === 0) {
            savedProductsList.innerHTML = `
                <p>No saved products found on this device.</p>
            `;
            return;
        }

        let listHtml = "";
        keys.forEach(key => {
        listHtml += `
            <div class="saved-product">
            <span>${key}</span>
            <div class="saved-product-actions-container">
                <button class="btn btn-secondary btn-load-product" data-product="${key}">Load</button>
                <button class="btn-delete btn-delete-product" data-product="${key}" aria-label="Delete product ${key}">
                <img src="images/delete.svg" alt="Delete icon">
                </button>
            </div>
            </div>
        `;
        });
        savedProductsList.innerHTML = listHtml;

        savedProductsList.querySelectorAll(".btn-load-product").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const productName = e.target.getAttribute("data-product");
                loadProduct(productName);
            });
        });

        savedProductsList.querySelectorAll(".btn-delete-product").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const btnNode = e.target.closest(".btn-delete-product");
                const pName = btnNode.getAttribute("data-product");
                deleteProduct(pName);
            });
        });
    }

    // Load a saved product.
    function loadProduct(productName) {
        const product = savedProducts[productName];
        if (!product) return;

        materials = [...product.materials];
        projectNameInput.value = product.projectName;
        hourlyRateInput.value = product.hourlyRate;
        laborHoursInput.value = product.laborHours;
        batchSizeInput.value = product.batchSize;
        overheadInput.value = product.overhead;
        marginSlider.value = product.margin;
        marginValLabel.textContent = `${product.margin}%`;

        localStorage.setItem("costCraft_currentMaterials", JSON.stringify(materials));
        cacheInputsState();
        populateMaterialsTable();
        updateCalculations();
        showSaveMessage(`Loaded product "${productName}" successfully.`, "success");
    }

    //Delete a saved product
    function deleteProduct(productName) {
        if (savedProducts[productName]) {
            delete savedProducts[productName];
            localStorage.setItem("costCraft_productProfiles", JSON.stringify(savedProducts));
            populateSavedProductsList();
            showSaveMessage(`Product "${productName}" deleted.`, "danger");
        }
    }

    // Show save or load messages
    function showSaveMessage(message, type) {
        saveMessage.textContent = message;
        saveMessage.style.color = type === "success" ? "var(--primary-hover)" : "var(--danger-color)";
        setTimeout(() => {
            if (saveMessage.textContent === message) {
                saveMessage.textContent = "";
            }
        }, 4000);
    }
}

function initContactForm() {
    const form = document.querySelector("#form");
    const formCard = document.querySelector("#formCard");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.querySelector("#fullName").value.trim();
        const email = document.querySelector("#emailAddress").value.trim();
        const businessSelect = document.querySelector("#businessType");
        const sectorText = businessSelect.options[businessSelect.selectedIndex].text;
        const formatSelect = document.querySelector("input[name='format']:checked");
        const formatText = formatSelect.value;

        formCard.innerHTML = `
            <div class="form-response">
                <div class="success-icon-container">
                    <img src="images/done.svg" alt="" aria-hidden="true" loading="lazy" width="24" height="24">
                </div>
                <h2>Request Submitted!</h2>
                <p class="thanks">Thank you, ${name}. Your data has been registered.</p>
                <p><strong>Business Sector: </strong>${sectorText}.<br>
                    <strong>Template format: </strong>${formatText}.<br>
                    The template will be sent to <strong>${email}</strong> shortly.</p>
                <a href="calculator.html" class="btn btn-primary">Return to Calculator</a>
            </div>
        `;
    });
}