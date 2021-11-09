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
					"<button type='button' class='btn btn-info'>Info</button>"
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
				{ title: "Detalhes" }
			]
		});
		
	}
	
};

window.addEventListener("DOMContentLoaded", Page.initialize)