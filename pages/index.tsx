import Header from "@/components/Header";
import Head from "next/head";
import { sanityClient, urlFor } from "../sanity";
import { Categorys, Post } from "@/typings";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import PortableText from "react-portable-text";
import { useState,useEffect } from "react";
interface Props {
  posts: [Post];
  category: [Categorys];
}

export default function Home({ posts, category }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const filteredItems = posts.filter((item) => item.category._id === selectedCategory);
  return (
    <Layout
      title={
        "Directorio de IA: Todas las soluciones de inteligencia artificial en un solo lugar"
      }
      description={
        "Encuentra todas las soluciones de inteligencia artificial que necesitas en nuestro directorio completo de IA. Descubre lo último en tecnología de IA y recursos útiles para cualquier necesidad."
      }
    >
      <div className="mx-auto">
        <section
          className="h-screen flex justify-end items-center   border-black text-center md:text-right"
          style={{
            backgroundImage: "url(/img/bg-header6.jpg)",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="px-5 space-y-5 text-green-300  container max-w-8xl mx-auto flex flex-col justify-end items-center md:items-end">
            <h1 className="text-2xl md:text-4xl max-w-xl uppercase  text-green-300">
              El mayor directorio de{" "}
              <span className="text-5xl md:text-6xl font-bold ">
                Inteligencias Artificiales
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl uppercase ">Gratis</h2>
          </div>
        </section>

        <section className="container max-w-8xl mx-auto p-4 ">
          <article className="flex flex-col justify-center my-10 space-y-3">
            <h4 className="text-slate-300 text-lg font-semibold text-center md:text-left">A continuación puedes filtrar las inteligencias artificiales por categoría:</h4>
            <select
              className="rounded-lg bg-slate-300 text-lg p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value={"0"}>Todas</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.title}</option>
              ))}
            </select>
          </article>
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-6 p-2">
            {selectedCategory === "0"
              ? posts.map((post) => (
                  <div key={post._id} className="card relative h-80 w-auto ">
                    <div className="face front">
                      <Image
                        className=" absolute w-full h-full object-cover"
                        src={urlFor(post.mainImage.asset).url()!}
                        width={1000}
                        height={1000}
                        alt={" Image Post"}
                      />
                      <div className=" absolute bottom-0 left-0 right-0 text-center py-4 bg-[#595d5f] backdrop-blur-[9px] text-lg font-semibold ">
                        <h4 className=" text-green-300">{post.title}</h4>
                      </div>
                    </div>
                    <div className="face back w-full h-full text-center flex flex-col justify-center gap-5 items-center">
                      <p className="text-xl font-bold text-green-300">
                        {post.title}
                      </p>
                      <ul className=" flex flex-col gap-2 overflow-y-auto rounded-lg">
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-neutral-300 rounded-lg p-2">
                          <span className=" ">&#128176;</span>
                          <p>{post.price.title}</p>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-blue-300 rounded-lg p-2">
                          <span className=" ">&#127759;</span>
                          <Link
                            className=" underline underline-offset-2"
                            href={post.link}
                          >
                            {post.link}
                          </Link>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full  text-left bg-indigo-300 rounded-lg p-2">
                          <span className=" ">&#128196;</span>
                          <PortableText
                            className=""
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={
                              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
                            }
                            content={post.body}
                            serializers={{
                              h1: (props: any) => (
                                <h1 className=" text-2xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              h2: (props: any) => (
                                <h1 className=" text-xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              li: ({ children }: any) => (
                                <li className="ml-4 list-disc ">{children}</li>
                              ),
                              link: ({ href, children }: any) => (
                                <a
                                  href={href}
                                  className=" text-blue-500 hover:underline"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </li>
                      </ul>
                      <Link
                        className="p-2 bg-green-300 rounded-lg"
                        href={`/post/${post.slug.current}`}
                      >
                        Mas Detalle
                      </Link>
                    </div>
                  </div>
                ))
              : filteredItems?.map(post => (
                  <div key={post._id} className="card relative h-80 w-auto ">
                    <div className="face front">
                      <Image
                        className=" absolute w-full h-full object-cover"
                        src={urlFor(post.mainImage.asset).url()!}
                        width={1000}
                        height={1000}
                        alt={" Image Post"}
                      />
                      <div className=" absolute bottom-0 left-0 right-0 text-center py-4 bg-[#595d5f] backdrop-blur-[9px] text-lg font-semibold ">
                        <h4 className=" text-green-300">{post.title}</h4>
                      </div>
                    </div>
                    <div className="face back w-full h-full text-center flex flex-col justify-center gap-5 items-center">
                      <p className="text-xl font-bold text-green-300">
                        {post.title}
                      </p>
                      <ul className=" flex flex-col gap-2 overflow-y-auto rounded-lg">
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-neutral-300 rounded-lg p-2">
                          <span className=" ">&#128176;</span>
                          <p>{post.price.title}</p>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full text-left bg-blue-300 rounded-lg p-2">
                          <span className=" ">&#127759;</span>
                          <Link
                            className=" underline underline-offset-2"
                            href={post.link}
                          >
                            {post.link}
                          </Link>
                        </li>
                        <li className="flex justify-start items-center gap-2 w-full  text-left bg-indigo-300 rounded-lg p-2">
                          <span className=" ">&#128196;</span>
                          <PortableText
                            className=""
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={
                              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
                            }
                            content={post.body}
                            serializers={{
                              h1: (props: any) => (
                                <h1 className=" text-2xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              h2: (props: any) => (
                                <h1 className=" text-xl font-bold my-5 ">
                                  {...props}
                                </h1>
                              ),
                              li: ({ children }: any) => (
                                <li className="ml-4 list-disc ">{children}</li>
                              ),
                              link: ({ href, children }: any) => (
                                <a
                                  href={href}
                                  className=" text-blue-500 hover:underline"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          />
                        </li>
                      </ul>
                      <Link
                        className="p-3 bg-green-300 rounded-lg"
                        href={`/post/${post.slug.current}`}
                      >
                        Mas Detalle
                      </Link>
                    </div>
                  </div>
                ))}
          </article>
        </section>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
link,
    description,
      mainImage,
      slug,    
      category->{title,_id},
      price->{title},
      body
    
  }`;

  const categorys = `*[_type == "category"]{
    _id,
    title,
  }`;

  const posts = await sanityClient.fetch(query);
  const category = await sanityClient.fetch(categorys);
  return {
    props: {
      posts,
      category,
    },
  };
};

