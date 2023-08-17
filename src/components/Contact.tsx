import "../css/Contact.css";

import FacebookIcon from "../assets/FooterFacebookIcon.svg";
import InstagramIcon from "../assets/FooterInstagramIcon.svg";

interface contactData {
  icon: string;
  info: String;
}

interface ContactDataProps {
  contactData: contactData[];
}

function GetInTouch(props: ContactDataProps) {
  const contact = (
    <div id="contact-content">
      <div>
        <h1>GET IN TOUCH</h1>
      </div>
      <div>
        <p>
          Thank you for your interest in V Number. If you have any enquiries,
          <br />
          welcome to contact us!
        </p>
      </div>

      {props.contactData.map((contactData, index) => (
        <div className="contact-row d-flex align-items-center" key={index}>
          <div className="contact-icon">
            <img src={contactData.icon} />
          </div>
          <div className="contact-info">
            <p>{contactData.info}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const footer = (
    <div id="contact-footer">
      <div className="row container">
        <div className="col-9">
          <p>
            © 2022 V NUMBER (88997654321) All rights reserved. | Privacy Policy
          </p>
        </div>
        <div className="col-3">
          <div className="d-flex justify-content-end">
            <img id="facebook_icon" src={FacebookIcon} alt="Facebook Icon" />
            <img src={InstagramIcon} alt="Instagram Icon" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div id="contact">
        {contact}
        {footer}
      </div>
    </>
  );
}

export default GetInTouch;
