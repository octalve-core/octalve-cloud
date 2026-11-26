import {CloudShell} from "@/features/cloud/components/CloudShell";
import {ShoppingReview} from "@/features/cloud/commerce/ShoppingProvider";

export const metadata={title:"Shopping cart",robots:{index:false,follow:false}};

export default function Page(){return <CloudShell><ShoppingReview/></CloudShell>;}
