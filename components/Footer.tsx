import { footerLinks } from "@/constants";
import Img from "next/image";
import Link from "next/link";

interface ColumnProps {
  title: string;
  links: string[] | Array<string>;
}

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link 
        className='hover:underline'
        href="#" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div
        className="
         flex
         flex-col
         gap-12
         w-full
         "
      >
        <div className="flex items-start flex-col">
          <Img src="/logo-2.png" alt="logo" width={50} height={43} />
          <p
            className="
               text-start
               text-sm
               font-normal
               mt-5
               max-w-xs
               "
          >
            Here is a very interesting description with incredible text.
          </p>
        </div>
        <div className="1 flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <div className="flex flex-col flex-1 gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
          <div className="flex flex-col flex-1 gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>
      <div className='flexBetween footer_copyright'>
         <p>@ {new Date().getFullYear()} Test-project#2
          All rights reserved.
         </p>
         <p className='text-slate-400'>
               <span className='text-black font-semibold mr-3'>
                  10000 
               </span>
               projects submited.
         </p>
      </div>
    </footer>
  );
};

export default Footer;
