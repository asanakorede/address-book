// Business Logic for AddressBook ---------
function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] != undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address, workAddress, otherAddress, workEmail) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.workAddress = workAddress;
    this.otherAddress = otherAddress;
    this.workEmail = workEmail;
}

Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
    let contactsList = $("ul#contacts");
    let htmlForContactInfo = "";
    Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
        const contact = addressBookToDisplay.findContact(key);
        htmlForContactInfo += '<li class="fas fa-user-tie" id=' + contact.id + '>' + contact.firstName + ' ' + contact.lastName + ' ' + '</li><br>';
    });
    contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
    const contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".email").html(contact.email);
    $(".address").html(contact.address);
    $(".work-address").html(contact.workAddress);
    $(".other-address").html(contact.otherAddress);
    $(".work-email").html(contact.workEmail);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
    $("ul#contacts").on("click", "li", function () {
        showContact(this.id);
    });

    $("#buttons").on("click", ".deleteButton", function () {
        addressBook.deleteContact(this.id);
        $("#show-contact").hide();
        displayContactDetails(addressBook);
    });




}

$(document).ready(function () {
    attachContactListeners();
    $("form#new-contact").submit(function (event) {
        event.preventDefault();
        const inputtedFirstName = $("input#new-first-name").val();
        const inputtedLastName = $("input#new-last-name").val();
        const inputtedPhoneNumber = $("input#new-phone-number").val();
        const inputtedEmail = $('input#new-email').val();
        const inputtedAddress = $('input#new-address').val();
        const inputtedWorkAddress = $('input#new-work-address').val();
        const inputtedOtherAddress = $('input#new-other-address').val();
        const inputtedWorkEmail = $('input#new-work-email').val();

        $("input#new-first-name").val("");
        $("input#new-last-name").val("");
        $("input#new-phone-number").val("");
        $("input#new-email").val("");
        $("input#new-address").val("");
        $("input#new-work-address").val("");
        $("input#new-other-address").val("");
        $("input#new-work-email").val("");

        $("body").addClass("click-event")
        

        let newContact = new Contact(
            inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress, inputtedWorkAddress, inputtedOtherAddress, inputtedWorkEmail
        );
        addressBook.addContact(newContact);
        displayContactDetails(addressBook);
    });

    document.getElementById('dropDown2').addEventListener('click', showEmail);
    document.getElementById('dropDown').addEventListener('click', showAddress);

    function showAddress() {
        document.getElementById('other-addresses').style.display = 'block';
    }

    function showEmail() {
        document.getElementById('other-emails').style.display = 'block';
    }


});