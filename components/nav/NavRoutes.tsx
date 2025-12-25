"use client";

import HoverLink from "../general/HoverLink";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavRoutes: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
    const pathname = usePathname();


    const routes = [
        {
            href: `/#about`,
            label: "Who AM I?",
            active: pathname === `/#about`,
            external: false
        },
        {
            href: `/#skills`,
            label: "Skills",
            active: pathname === `/#skills`,
            external: false
        },
        {
            href: `/#projects`,
            label: "Projects",
            active: pathname === `/#projects`,
            external: false
        },
        {
            href: `/#contact`,
            label: "Contact Me",
            active: false,
            external: false
        },
        {
            href: `https://drive.google.com/file/d/1VXqcm9lb8SOAyRQuQdZ889vh6bx7lyou/view`,
            label: "Resume",
            active: false,
            external: true
        }
    ];

    return (
        <nav
            className={cn("hidden sm:flex items-center space-x-2 lg:space-x-4", className)}
            {...props}
        >
            {routes.map((route) => (
                <HoverLink key={route.href}>
                    <Link
                        href={route.href}
                        target={route.external ? "_" : ""}
                        className={cn(
                            "text-md font-medium transition-colors hover:text-primary",
                            route.active ? "text-sky-500" : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
                </HoverLink>

            ))}
        </nav>
    );
};

export default NavRoutes;