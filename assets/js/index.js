var Page = {
	
	initialize: () => {
		// call api
		$.get("https://testapi.io/api/Jonas-buriti/scholarships", (res) => {
			let data = JSON.parse(res);
			Page.loadTable(data);
		});
	},
	
	loadTable: (data) => {
		let dataset = data.map( (entry, i) => {
			if( entry.enabled ) {
				return [
					"<img class='university_logo' src='" + entry.university.logo_url + "' width='180px' height='150px' />",
					entry.course.name,
					entry.campus.city,
					entry.full_price,
					"<button type='button' class='btn btn-outline-info' onclick='Page.showModal(" + JSON.stringify(entry) + ")'>Info</button>"
				]
			}
		});
		$("#result").DataTable({
			searching: false,
			data: dataset,
			columns: [
				{ title: "Logo" },
				{ title: "Nome do Curso" },
				{ title: "Cidade" },
				{ title: "Preço" },
				{ title: "..." }
			]
		});
		
	},
	
	showModal: (data) => {
		console.log("showModal");
		$("#infoModal").html(`
<div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLongTitle">${data.course.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="Page.hideModal()">
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>
		`);
		$("#modalCenter").modal("show");
	},

	hideModal: () => {
		$("#modalCenter").modal("hide");
		$("#infoModal").innerHTML = "";
	}
};

window.addEventListener("DOMContentLoaded", Page.initialize)