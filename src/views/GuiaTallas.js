import guideCorte from "../assets/imagenes/guideCorte.png"
import guidePantalon from "../assets/imagenes/guidePantalon.png"
import guideCamisa from "../assets/imagenes/guideCamisa.png"
import guideSaco from "../assets/imagenes/guideSaco.png"
import guideChaleco from "../assets/imagenes/guideChaleco.png"
import guideSueter from "../assets/imagenes/guideSueter.png"
import guideSport from "../assets/imagenes/guideSport.png"
import guideChamarra from "../assets/imagenes/guideChamarra.png"
import guideCalzado from "../assets/imagenes/guideCalzado.png"

export function GuiaTallas(){
    return(
        <>
            <main className="main">
                <section className="story section container">
                    <div className="guide__container grid">
                        <h1 className="bold guide__title">GUIA TALLAS</h1>
                        <div className="guide__images">
                            <img src={guideCorte} className="guide_image"></img>
                            <img src={guidePantalon} className="guide_image"></img>
                            <img src={guideCamisa} className="guide_image"></img>
                            <img src={guideSaco} className="guide_image"></img>
                            <img src={guideChaleco} className="guide_image"></img>
                            <img src={guideSueter} className="guide_image"></img>
                            <img src={guideSport} className="guide_image"></img>
                            <img src={guideChamarra} className="guide_image"></img>
                            <img src={guideCalzado} className="guide_image"></img>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}