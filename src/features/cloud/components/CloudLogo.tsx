import Image from "next/image";
import Link from "next/link";
import octalveCloudLogo from "@/assets/logo/octalve-cloud-logo.png";

export function CloudLogo() {
  return (
    <Link
      href="/"
      aria-label="Octalve Cloud Home"
      className="octalve-cloud-focus inline-flex items-center"
    >
      <Image
        src={octalveCloudLogo}
        alt="Octalve Cloud"
        width={190}
        height={56}
        priority
        className="h-10 w-auto object-contain sm:h-11"
      />
    </Link>
  );
}
