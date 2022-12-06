export function Footer(){
    return(
        <>
        <footer className="footer section">
            <div className="footer__container container grid">
                
                <FooterContent 
                titulo="Our information"
                lista = {[{texto: "1234 address", link : ""},
                {texto: "La Libertad 43210", link : ""},
                {texto: "123-456-789", link : ""}]}
                /> 

                <FooterContent 
                titulo="Acerca de"
                lista = {[{texto: "Support Center", link : "Support Center"},
                {texto: "Customer Support", link : "Customer Support"},
                {texto: "About Us", link : "About Us"},
                {texto: "Copy Right", link : "Copy Right"}]}
                />
                 <FooterContent 
                titulo="Product"
                lista = {[{texto: "Road bikes", link : "Road bikes"},
                {texto: "Mountain bikes", link : "Mountain bikes"},
                {texto: "Electric", link : "Electric"},
                {texto: "Accesories", link : "Accesories"}]}
                />

                <FooterContentSocial 
                titulo="Social"
                lista = {[{link : "https://www.facebook.com/", icono: "bx bxl-facebook"},
                {link : "https://twitter.com/", icono:"bx bxl-twitter"},
                {link : "https://www.instagram.com/", icono: "bx bxl-instagram"}]}
                />
            </div>
            <span className="footer__copy">Copy right</span>
        </footer>
        </>
    );
}

const FooterContentSocial =({titulo,lista})=>{
    return(<>
    <div className="footer__content">
        <h3 className="footer__title">{titulo}</h3>
        <ul className="footer__social">
            {
               lista.map(elemento =>(
                <a key={elemento.link} href={elemento.link} target="_blank" className="footer__social-link">
                            <i className={elemento.icono}></i>
                        </a>
                )) 
            }
        </ul>
    </div>
    </>);
}

const FooterContent =({titulo,lista})=>{
    return(<>
    <div className="footer__content">
        <h3 className="footer__title">{titulo}</h3>
        <ul className="footer__links">
            {
               lista.map(elemento =>(
                <Li key={elemento.texto} texto={elemento.texto} link ={elemento.link}/>
                )) 
            }
        </ul>
    </div>
    </>);
}

const Li = ({texto, link})=>{
    return(
        <>
            <li>
                {link===''?texto:<a href={link} className="footer__link">{texto}</a>}
            </li>
        </>
    );
}