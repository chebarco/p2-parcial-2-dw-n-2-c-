//ofertas setTimeout
const ofertas=[
    "•20% OFF pago efectivo",
    "•Ahora 18-Cuotas sin intereses",
    "•Visa y Master 10% OFF"
 ]

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("promo").addEventListener("click", () => {

      let random =Math.ceil(Math.random()* (ofertas.length - 1))

      let cardPromo = document.createElement("div");
      cardPromo.className = "textopromocion";
  
      let cardBody = document.createElement("div");
      cardBody.className = "cardText";
      cardBody.innerText= ofertas[random],
  
  
      cardPromo.append(cardBody)
      document.querySelector('main').append(cardPromo)
  
  
      setTimeout(hidModal, 2000);
    });
  });
  
  function hidModal(){
    document.querySelector('.textopromocion').remove();
  }
  