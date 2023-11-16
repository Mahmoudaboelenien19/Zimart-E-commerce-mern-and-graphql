import { AiFillGithub, AiOutlineWhatsApp } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Title from "../widgets/Title";
const iconsArr = [
  {
    id: 1,
    Icon: <GrLinkedinOption />,
    link: "https://www.linkedin.com/in/mahmoud-abo-elenien19/",
    title: "go to my linkedin",
  },
  {
    id: 2,
    Icon: <AiFillGithub />,
    link: "https://github.com/Mahmoudaboelenien19",
    title: "go to my github",
  },
  {
    id: 3,
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path d="M 4.5 3 C 2.5788117 3 1 4.5788117 1 6.5 L 1 18 C 1 19.64497 2.3550302 21 4 21 L 8 21 L 8 13.673828 L 12 16.798828 L 16 13.673828 L 16 21 L 20 21 C 21.64497 21 23 19.64497 23 18 L 23 6.5 C 23 4.5788117 21.421188 3 19.5 3 C 18.750123 3 17.982547 3.2422598 17.34375 3.7421875 L 12 7.9121094 L 6.65625 3.7421875 L 6.6542969 3.7421875 C 6.0158061 3.2430811 5.2492693 3 4.5 3 z M 4.5 5 C 4.8301235 5 5.1426247 5.098287 5.4238281 5.3183594 L 6 5.7675781 L 6 9.5742188 L 3 7.2324219 L 3 6.5 C 3 5.6591883 3.6591883 5 4.5 5 z M 19.5 5 C 20.340812 5 21 5.6591883 21 6.5 L 21 7.2324219 L 18 9.5742188 L 18 5.7675781 L 18.576172 5.3183594 C 18.857375 5.0982871 19.169877 5 19.5 5 z M 8 7.328125 L 12 10.449219 L 16 7.328125 L 16 11.136719 L 12 14.261719 L 8 11.136719 L 8 7.328125 z M 3 9.7695312 L 6 12.111328 L 6 19 L 4 19 C 3.4349698 19 3 18.56503 3 18 L 3 9.7695312 z M 21 9.7695312 L 21 18 C 21 18.56503 20.56503 19 20 19 L 18 19 L 18 12.111328 L 21 9.7695312 z" />
      </svg>
    ),
    title: "send me an Email",
    link: "mailto:m.aboelenien20020@gmail.com",
  },
  {
    id: 4,
    Icon: <AiOutlineWhatsApp />,
    title: "send me whatApp message",
    link: "https://wa.me/+201503636395",
  },
];
const arr = [
  { Icon: MdEmail, content: "m.aboelenien20019@gmail.com" },

  { Icon: MdPhone, content: "+201503636395" },
  { Icon: FaLocationDot, content: "Manssoura Egypt" },
];
const ZimartDetails = ({ type }: { type?: string }) => {
  return (
    <>
      <div className="contact-us">
        {arr.map(({ Icon, content }, index) => (
          <div key={index}>
            <Icon className="contact-icon" />
            <span className="contact-txt">{content}</span>
          </div>
        ))}
      </div>
      {type === "footer" ? (
        <br />
      ) : (
        <div className="contact-h contact-txt">contact with us :</div>
      )}
      <div className="contact-icons">
        {iconsArr.map(({ Icon, id, title, link }) => {
          return (
            <Title key={id} title={title}>
              <a className={"contact-links"} href={link} target="blank">
                {Icon}
              </a>
            </Title>
          );
        })}
      </div>
    </>
  );
};

export default ZimartDetails;
