import { Menu } from "@headlessui/react";
import Image from "next/image";

type Props = {
  title: string;
  state: string;
  setState: (value: string) => void;
  filters: string[];
};

const CustomMenu: React.FC<Props> = ({ title, setState, state, filters }) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-slate-500">
        {title}
      </label>
      <Menu as={"div"} className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || "Select category"}
            <Image
              src="/arrow-down.svg"
              width={12}
              height={5}
              alt="drop-down menu arrow"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item cursor-pointer hover:scale-105 transition-transform"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
