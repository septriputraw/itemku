function main() {

    const baseUrl = "http://localhost:5000";

    //ambil data report
    const getTrx = () => {
        fetch(`${baseUrl}/report`)
         .then(response => {
             return response.json();
         })
         .then(responseJson => {
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllTransactions(responseJson.data);
            }
         })
         .catch(error => {
             showResponseMessage(error);
         })
    };

    //ambil data item
    const getItem = () => {
        fetch(`${baseUrl}/item`)
         .then(response => {
             return response.json();
         })
         .then(responseJson => {
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllItems(responseJson.data);
            }
         })
         .catch(error => {
             showResponseMessage(error);
         })
    };
    //dengan await
    /*const getBook = async () => {
        try {
          const response = await fetch(`${baseUrl}/list`);
          const responseJson = await response.json();
          if(responseJson.error) {
             showResponseMessage(responseJson.message);
          } else {
             renderAllBooks(responseJson.books);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }*/

    /*const getBook = () => {
        // membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();
            
        //menetapkan callback jika response sukses dan error
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            if(responseJson.error) {
               showResponseMessage(responseJson.message);
            } else {
               renderAllBooks(responseJson.books);
            }
        }
     
        xhr.onerror = function() {
            showResponseMessage();
        }
     
        // Membuat GET request dan menetapkan target URL
        xhr.open("GET", `${baseUrl}/list`);
        // Mengirimkan request
        xhr.send();
    };*/

    //dengan fetch
    const insertBook = (book) => {
        fetch(`${baseUrl}/item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            //    "X-Auth-Token": "12345"
            },
            body: JSON.stringify(book)
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.message);
            getItem();
        })
        .catch(error => {
            showResponseMessage(error);
        })
    };

    //dengan fetch
    const insertTrx = (trx) => {
        fetch(`${baseUrl}/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            //    "X-Auth-Token": "12345"
            },
            body: JSON.stringify(trx)
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.message);
            getTrx();
        })
        .catch(error => {
            showResponseMessage(error);
        })
    };

    //dengan await/async
    /*const insertBook = async (book) => {
        try{
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
                },
                body: JSON.stringify(book)
            }
     
            const response = await fetch(`${baseUrl}/add`, options)
            const responseJson = await response.json();
            showResponseMessage(responseJson.message);
            getBook();
        } catch(error) {
            showResponseMessage(error)
        }
    }*/

    /*const insertBook = (book) => {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();

        //menetapkan callback jika response sukses dan error
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }

        xhr.onerror = function() {
            showResponseMessage();
        }

        // Membuat POST request dan menetapkan target URL
        xhr.open("POST", `${baseUrl}/add`);
        
        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");

        // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
        xhr.send(JSON.stringify(book));
    };*/

    //dengan fetch
    const updateBook = (book) => {
        fetch(`${baseUrl}/item/${book.id}`, {
             method: "PUT",
             headers: {
                    "Content-Type": "application/json",
                    //"X-Auth-Token": "12345"
             },
             body: JSON.stringify(book)
         })
         .then(response => {
                return response.json();
         })
         .then(responseJson => {
                showResponseMessage(responseJson.message);
                getBook();
         })
         .catch(error => {
                showResponseMessage(error);
         })
    };

    //dengan async/await
    /*const updateBook = async (book) => {
        try {
            const options = {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
               },
               body: JSON.stringify(book)
            }
        
            const response = await fetch(`${baseUrl}/edit/${book.id}`, options);
            const responseJson = await response.json();
        
            showResponseMessage(responseJson.message);
            getBook();
       } catch(error) {
            showResponseMessage(error);
       }
    };*/
    /*dengan AJAX XHR
    const updateBook = (book) => {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();
 
        //menetapkan callback jika response sukses dan error
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }
 
        xhr.onerror = function() {
            showResponseMessage();
        }
 
        // Membuat PUT request dan menetapkan target URL
        xhr.open("PUT", `${baseUrl}/edit/${book.id}`);
        
        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");
 
        // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
        xhr.send(JSON.stringify(book));
    };*/

    //dengan fetch
    const removeBook = (bookId) => {
        fetch(`${baseUrl}/item/${bookId}`, {
            method: "DELETE",
            headers: {
                //"X-Auth-Token": "12345"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.message);
            getBook();      
        })
        .catch(error => {
            showResponseMessage(error);
        })
    };

    /*dengaan await
    const removeBook = async (bookId) => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    "X-Auth-Token": "12345"
               }
            }
        
            const response = await fetch(`${baseUrl}/delete/${bookId}`, options);
            const responseJson = await response.json();
        
            showResponseMessage(responseJson.message);
            getBook();
       } catch(error) {
            showResponseMessage(error);
       }
    };*/

    /*dengan XHR
    const removeBook = (bookId) => {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();
        
        //menetapkan callback jika response sukses dan error
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }
        
        xhr.onerror = function() {
            showResponseMessage();
        }
        
        // Membuat DELETE request dan menetapkan target URL
        xhr.open("DELETE", `${baseUrl}/delete/${bookId}`);
        
        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("X-Auth-Token", "12345");
        
        // Mengirimkan request
        xhr.send();
    };*/






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
                removeBook(itemId);
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
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");
        const buttonSaveTrx = document.querySelector("#buttonSaveTrx");

        buttonSave.addEventListener("click", function () {
            const item = {
                type_id: Number.parseInt(inputTypeId.value),
                name: inputItemName.value,
                qty: inputItemQty.value
            };
            insertBook(item)
        });

        buttonUpdate.addEventListener("click", function () {
            const item = {
                id: Number.parseInt(inputTypeId.value),
                name: inputItemName.value,
                qty: inputItemQty.value
            };

            updateBook(item)
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