window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var group = document.getElementById('group');
	var email = document.getElementById('email');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');
	//Sortierung
	var namesort = document.getElementById('nameSort');
	namesort.addEventListener("click", sort);
	var emailsort = document.getElementById('emailSort');
	emailsort.addEventListener("click", sort);
    var addresssort = document.getElementById('adressSort');
    addresssort.addEventListener("click", sort);
    var groupsort = document.getElementById('groupSort');
    groupsort.addEventListener("click", sort);
    var phonesort = document.getElementById('phoneSort');
    phonesort.addEventListener("click", sort);



    quickAddBtn.addEventListener("click", function(){
		// Anzeige der Form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];

    //localStorage['addbook'] = '[{"fullname":"Sachin B","email":"sachin@frameboxx.in","phone":"93828292","address":"something","city":"Chandigarh"}]';

    function jsonStructure(fullname,phone,address,group,email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.group = group;
		this.email = email;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && address.value!='' && group.value!='' && email.value!='';
		if(isNull){
			// Formatieren der Eingabe in eine g�ltige JSON-Struktur
			var obj = new jsonStructure(fullname.value,phone.value,address.value,group.value,email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		// Einen Eintrag aus dem Adressbuch entfernen
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook() {
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            console.log(addressBook);
            // Schleife �ber das Array addressBook und Einf�gen in die Seite
            // Dom nicht in schleife benutzen
            addBookDiv.innerHTML = '';
            var temporal = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
                str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
                str += '<div class="group"><p>' + addressBook[n].group + '</p></div>';
                str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">löschen</a></div>';
                str += '</div>';
                //addBookDiv.innerHTML += str;
                temporal += str;
            }

            addBookDiv.innerHTML = temporal;
        }
    }

    function sort() {
		var addressBook = JSON.parse(localStorage['addbook']);
		var attribut = this.value;
		addressBook.sort(function(a,b){
			var nameA = a[attribut].toUpperCase();
			var nameB = b[attribut].toUpperCase();
			if (nameA<nameB){
				return -1 ;
			}
			if (nameA>nameB){
				return 1;
			}
			return 0;
		});

        localStorage['addbook'] = JSON.stringify(addressBook);
        showAddressBook();
    }
	showAddressBook();

}