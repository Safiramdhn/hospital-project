import Image from 'next/image';
import Link from 'next/link';

const NavItem = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <li className="hover:bg-mint-300 p-2 rounded-2xl flex items-center cursor-pointer">
    <Link href={href} className="flex items-center">
      <Image src={icon} alt={label} width={30} height={30} className="w-6 h-6" />
      <p className="ml-2">{label}</p>
    </Link>
  </li>
);

export default NavItem;
