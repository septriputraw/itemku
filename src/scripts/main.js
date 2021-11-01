function main() {

    const baseUrl = "http://localhost:5000";

    // get item
    const getItem = async () => {
        try {
          const response = await fetch(`${baseUrl}/item`);
          const responseJson = await response.json();
          if(responseJson.error) {
             showResponseMessage(responseJson.message);
          } else {
             renderAllItems(responseJson.data);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    // get transaction history
    const getTrx = async () => {
        try {
          const response = await fetch(`${baseUrl}/report`);
          const responseJson = await response.json();
          if(responseJson.error) {
             showResponseMessage(responseJson.message);
          } else {
             renderAllTransactions(responseJson.data);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    // search transaction
    const searchTrx = async (query) => {
        try {
          const response = await fetch(`${baseUrl}/report/search?cari=${query}`);
          const responseJson = await response.json();
          if(responseJson.error) {
             showResponseMessage(responseJson.message);
          } else {
             renderSeacrh(responseJson.data);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    // add item 
    const insertItem = async (item) => {
        try{
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "X-Auth-Token": "12345"
                },
                body: JSON.stringify(item)
            }
     
            const response = await fetch(`${baseUrl}/item`, options)
            const responseJson = await response.json();
            showResponseMessage(responseJson.message);
            getItem();
        } catch(error) {
            showResponseMessage(error)
        }
    }

    // add transaction history
    const insertTrx = async (trx) => {
        try{
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "X-Auth-Token": "12345"
                },
                body: JSON.stringify(trx)
            }
     
            const response = await fetch(`${baseUrl}/transaction`, options)
            const responseJson = await response.json();
            showResponseMessage(responseJson.message);
            getTrx();
            getItem();
        } catch(error) {
            showResponseMessage(error)
        }
    }

    // update item by itemId
    const updateItem = async (itemId) => {
        try {
            const options = {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                    // "X-Auth-Token": "12345"
               },
               body: JSON.stringify(itemId)
            }
        
            const response = await fetch(`${baseUrl}/item/${itemId.id}`, options);
            const responseJson = await response.json();
        
            showResponseMessage(responseJson.message);
            getItem();
       } catch(error) {
            showResponseMessage(error);
       }
    };

    // remove item by itemID
    const removeItem = async (itemId) => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    // "X-Auth-Token": "12345"
               }
            }
        
            const response = await fetch(`${baseUrl}/item/${itemId}`, options);
            const responseJson = await response.json();
        
            showResponseMessage(responseJson.message);
            getItem();
       } catch(error) {
            showResponseMessage(error);
       }
    };

    /*
        jangan ubah kode di bawah ini ya!
    */

    const renderAllTransactions = (transactions) => {
        const listTrxElement = document.querySelector("#listTrx");
        listTrxElement.innerHTML = "";

        transactions.forEach(trx => {
            listTrxElement.innerHTML += `
            <tr>
                <td>${trx.id}</td>
                <td>${trx.itemName}</td>
                <td>${trx.qty}</td>
                <td>${trx.sold}</td>
                <td>${trx.dateTrx}</td>
                <td>${trx.itemType}</td>
            </tr>
            `;
        });
    };

    const renderSeacrh = (transactions) => {
        const listTrxElement = document.querySelector("#listTrx");
        listTrxElement.innerHTML = "";

        transactions.forEach(trx => {
            listTrxElement.innerHTML += `
            <tr>
                <td>${trx.idTrx}</td>
                <td>${trx.itemName}</td>
                <td>${trx.qty}</td>
                <td>${trx.sold}</td>
                <td>${trx.trxDate}</td>
                <td>${trx.itemType}</td>
            </tr>
            `;
        });
    };

    const renderAllItems = (items) => {
        const listItemElement = document.querySelector("#listItem");
        listItemElement.innerHTML = "";

        items.forEach(item => {
            listItemElement.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${item.type_id}</td>
                    <td>
                        <button type="button" class="btn btn-danger button-delete" id="${item.id}">Hapus</button>
                        <a href="<?= base_url('mahasiswa/print/' . $data['ajuanid']); ?>">Cetak Bukti</a>
                    </td>
                </tr>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const itemId = event.target.id;
                removeItem(itemId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputTypeId = document.querySelector("#inputTypeId");
        const inputItemName = document.querySelector("#inputItemName");
        const inputItemId = document.querySelector("#inputItemId");
        const inputItemSold = document.querySelector("#inputItemSold");
        const inputItemQty = document.querySelector("#inputItemQty");
        const inputSearch = document.querySelector("#cari");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");
        const buttonSaveTrx = document.querySelector("#buttonSaveTrx");
        const buttonSearch = document.querySelector("#btnCari");

        buttonSearch.addEventListener("click", function () {
            const item = inputSearch.value;
            searchTrx(item)
        });

        buttonSave.addEventListener("click", function () {
            const item = {
                type_id: Number.parseInt(inputTypeId.value),
                name: inputItemName.value,
                qty: inputItemQty.value
            };
            insertItem(item)
        });

        buttonUpdate.addEventListener("click", function () {
            const item = {
                id: Number.parseInt(inputTypeId.value),
                name: inputItemName.value,
                qty: inputItemQty.value
            };

            updateItem(item)
        });

        buttonSaveTrx.addEventListener("click", function () {
            const trx = {
                item_id: Number.parseInt(inputItemId.value),
                sold: inputItemSold.value
            };
            insertTrx(trx)
        });
        getItem();
        getTrx();
    });
}

export default main;
