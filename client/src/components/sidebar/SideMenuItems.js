import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";

export const SideMenuItem = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: <GridViewRoundedIcon />,
  },
  {
    path: "customers",
    name: "Customers",
    icon: <GroupIcon />,
  },

  {
    path: "products",
    name: "Product List",
    icon: <InventoryIcon />,
    //   icon: <FaThList />,
  },

  {
    path: "invoices",
    name: "Invoices",
    icon: <DescriptionIcon />,
    //   icon: <FaShoppingBag />,
  },
  // {
  //   path: "viewinvoices",
  //   name: "AC",
  //   icon: <DescriptionIcon />,
  //   //   icon: <FaShoppingBag />,
  // },
];
