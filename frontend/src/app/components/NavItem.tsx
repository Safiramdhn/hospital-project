import Image from 'next/image';

const NavItem = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <li className="hover:bg-mint-300 p-2 rounded-2xl flex items-center cursor-pointer">
    <Image src={icon} alt={label} width={30} height={30} className="w-6 h-6" />
    <p className="ml-2">{label}</p>
  </li>
);

export default NavItem;
