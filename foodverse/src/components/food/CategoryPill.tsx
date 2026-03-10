import Image from "next/image";
import Link from "next/link";

export interface CategoryPillProps {
    name: string;
    image: string;
    href?: string;
}

export function CategoryPill({ name, image, href = "/restaurants" }: CategoryPillProps) {
    return (
        <Link href={href} className="group flex flex-col items-center gap-3 min-w-[80px]">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm shadow-black/5 ring-1 ring-border group-hover:ring-primary/50 group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 96px, 128px"
                />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors text-center">
                {name}
            </span>
        </Link>
    );
}
