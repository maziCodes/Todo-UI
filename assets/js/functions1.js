$(function () {
	var operation = "c";
	var selected_index = -1;
	var tb1Persons = localStorage.getItem("tb1Persons");
	tb1Persons = JSON.parse(tb1Persons);
	if (tb1Persons === null) {
		tb1Persons = [];
	}

	function Create() {
		var person = JSON.stringify({
			ID: $("#txtID").val(),
			Name: $("#txtName").val(),
			Phone: $("#txtPhone").val(),
			Email: $("#txtEmail").val()
		});

		tb1Persons.push(person);

		localStorage.setItem("tb1Persons", JSON.stringify(tb1Persons));
		alert("I got some data; Hurray!!!");
		return true;
	}

	function Edit() {
		tb1Persons[selected_index] = JSON.stringify({
			ID: $("#txtID").val(),
			Name: $("#txtName").val(),
			Phone: $("#txtPhone").val(),
			Email: $("#txtEmail").val()
		});

		localStorage.setItem("tb1Persons", JSON.stringify(tb1Persons));
		alert("I got another data; Hurray!!!");
		return true;
	}

	function Delete() {
		tb1Persons.splice(selected_index, 1);

		localStorage.setItem("tb1Persons", JSON.stringify(tb1Persons));
		alert("I got another data; Hurray!!!");
	}

	function List() {
		$("#tb1List").html("");
		$("#tb1List").html(
				"<thead>" +
				"<tr>" +
				"<th>ID</th>" +
				"<th>Number</th>" +
				"<th>Telephone</th>" +
				"<th>Email</th>" +
				"<th>Action</th>" +
				"</tr>" +
				"</thead>" +
				"<tbody>" +
				"</tbody>"
			);
		for (var i in tb1Persons) {
			var per = JSON.parse(tb1Persons[i]);
			$("#tb1List tbody").append("<tr>" +
				"<td>" + per.ID + "</td>" +
				"<td>" + per.Name + "</td>" +
				"<td>" + per.Phone + "</td>" +
				"<td>" + per.Email + "</td>" +
				"<td><button  alt='Edit' value='" + i + "' class='btnEdit'> Edit </button> &nbsp &nbsp <button alt='Delete' value='" + i + "' class='btnDelete'> Delete </button></td> </tr>"
				);
		}
	}

	$("#frmPerson").bind("submit", function () {
		if (operation === "c") 
		{
			return Create();
		} 
		else 
		{
			return Edit();
		}
	});

	List();

	$(".btnEdit").bind("click", function() {
		operation = "E";

		selected_index = parseInt($(this).val());

		var per = JSON.parse(tb1Persons[selected_index]);
		$("#txtID").val(per.ID);
		$("#txtName").val(per.Name);
		$("#txtPhone").val(per.Phone);
		$("#txtEmail").val(per.Email);
		$("#txtID").attr("readonly", "readonly");
		$("#txtName").focus();
	});

	$(".btnDelete").bind("click", function () {
		selected_index = parseInt($(this).val());
		if (confirm("Are you sure you want to delete")) 
		{
			Delete();
			List();
			window.location.reload();
		}
	});
});