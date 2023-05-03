import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <footer>
      <div className=" p-5 bg-slate-600  h-52 flex justify-center ">
        <div className="flex flex-col sm:flex-row justify-around sm:justify-between sm:gap-2 items-center text-black container max-w-8xl mx-auto px-4">
          <div>
            <Link href={"/"}>
              <div>
                <p className=" text-green-300 text-4xl font-extrabold">
                  BuscaTu<span className=" text-black">AI</span>
                </p>
              </div>
            </Link>
          </div>
          <div>
            <p className=" text-slate-300 ">
              Todos los derechos reservados por
              <span className=" underline underline-offset-2">
                {" "}
                BuscaTuAI © {new Date().getFullYear()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
