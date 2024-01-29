document.querySelectorAll('.btnDetail').forEach(item => {
    item.addEventListener('click', (e) => {
        let parent = e.target.parentNode.parentNode;

        let gambar = parent.querySelector('.card-img-top').src;
        let harga = parent.querySelector('.harga').innerHTML;
        let judul = parent.querySelector('.card-text').innerHTML;
        let deskripsi = parent.querySelector('.deskripsi')? parent.querySelector('.deskripsi').innerHTML:'<i> tidak ada informasi yang tersedia </i>';
        

        let tombolmodal = document.querySelector('.btnModal');
        tombolmodal.click();

        document.querySelector('.modalTitle').innerHTML = judul;
        let image = document.createElement('img');
        image.src = gambar;
        image.classList.add('w-100')
        document.querySelector('.modalImage').innerHTML = '';
        document.querySelector('.modalImage').appendChild(image)
        document.querySelector('.modalDeskripsi').innerHTML = deskripsi;
        document.querySelector('.modalHarga').innerHTML = harga;

        const nohp = '628138627506';
        let pesan = `https://api.whatsapp.com/send/?phone=62895340935041&text&type=phone_number&app_absent=0 ${gambar}`;

        document.querySelector('.btnBeli').href = pesan;

    });
});

const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");


function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br>
     Phone Number: ${phone.value}<br> Message:{mess.value}`;

    Email.send({
        SecureToken : "97f1338a-5251-43bf-856f-7437d851fc2c",
        Host : "smtp.elasticemail.com",
        Username : "furnihouse24@gmail.com",
        Password : "659D5FE0C8A3DA8578B7033A26D5AF206560",
        To : 'furnihouse24@gmail.com',
        From : "furnihouse24@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Massage sent successfully",
                icon: "success"
              });
        }
      }
    );
    }

    function checkInputs () {
        const items = document.querySelectorAll(".item");

        for (const item of items) {
            if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
            }

            if(items[1].value  !="") {
                checkEmail();
            }

            items[1].addEventListener("keyup", ()=> {
                checkEmail();
            });


            item.addEventListener("keyup", () => {
                if(item.value != "") {
                    item.classList.remove("error");
                    item.parentElement.classList.remove("error");
                }
                else {
                    item.classList.add("error");
                    item.parentElement.classList.add("error");
                }
            });
        }
    }

    function checkEmail() {
        const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2-3})(\.[a-z]{2,3})?$/;
        const errorTextEmail = document.querySelector(".error-text.email");

        if (!email.value.match(emailRegex)) {
            email.classList.add("error");
            email.parentElement.classList.add("error");

            if (email.value !="") {
                errorTextEmail.innerText = "Enter a valid email address"
            }
        }
        else {
            email.classList.remove("error");
            email.parentElement.classList.remove("error");
            errorTextEmail.innerText = ""
        }
    }

form.addEventListener("submit" , (e) => {
    e.preventDefault();
    checkInputs ();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && 
    !phone.classList.contains("error") && !subject.classList.contains("error") && 
    !mess.classList.contains("error")) {
       sendEmail();
    }

    form.reset();
    return false

});