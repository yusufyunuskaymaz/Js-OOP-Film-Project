const form = document.getElementById("film-form")
const titleELement = document.querySelector("#title")
const directorElement = document.querySelector("#director")
const urlElement = document.querySelector("#url")
const cardbody2  = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI Objesini Başlatma
const ui = new UI();

// Storage Objesi Üret
const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardbody2.addEventListener("click", deleteFilm)
    clear.addEventListener("click", clearAllFilms)
}

function addFilm(e){
    const title = titleELement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        ui.displayMessages("Lütfen Hepsini Doldurun", "danger")
    }else{
        // Yeni Film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm) // Arayüze Film Ekleme
        storage.addFilmToStorage(newFilm); // Storage a film ekleme
        ui.displayMessages("Film Başarıyla Eklendi...", "success")

    }

    ui.clearInputs(titleELement,directorElement,urlElement)




    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target)
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi Başarılı...", "success")
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage()
    }
    
}