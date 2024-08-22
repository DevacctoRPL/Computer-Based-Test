import React from "react";
import Navbar from "../components/navbar.js";

const SoalSiswa: React.FC = () => {
    return (
        <>
            <div className="h-screen">
                <Navbar />
                <main className="flex justify-between mt-6 h-[85%]">
                    <div className="flex flex-col w-1/5 p-4 space-y-4 fixed">
                        <div className="bg-purple-100 rounded-lg h-[400px]"></div>
                        <div className="bg-purple-100 rounded-lg h-[220px]"></div>
                    </div>
                    <div className="soal flex flex-col w-1/2 bg-purple-100 p-3 space-y-6 my-4 mx-auto rounded-md">
                        <div className="bg-white p-4 max-h-[310px] min-h-[310px] overflow-scroll overflow-x-hidden rounded-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perferendis, praesentium, est laboriosam, aperiam molestiae recusandae optio tenetur facere fugiat explicabo dignissimos corporis quis ex eaque aut quia eum modi!
                            Nesciunt quae illo rem laborum quo commodi ipsam maiores iusto, vel esse consequuntur sit quibusdam impedit cum? Animi quo, dolore commodi consequatur repudiandae laboriosam ex, doloribus beatae asperiores, quos quas.
                            Repudiandae quasi ullam dolor sit sint unde impedit fugiat, laborum porro mollitia totam magni laudantium doloribus in exercitationem reprehenderit provident ad repellat iure perspiciatis quos consequuntur deleniti cupiditate? Magnam, asperiores.
                            Culpa labore repellendus dolorem enim vel est voluptates adipisci veniam? Enim rem fugit architecto? Modi libero repudiandae ullam illum mollitia nisi, est error ad inventore beatae sunt, id repellat reprehenderit?
                            Sint rem inventore reprehenderit assumenda cupiditate voluptatum repudiandae, facilis corrupti quaerat eaque adipisci. Numquam nihil eaque facere delectus aut voluptate, ipsum autem aspernatur quisquam obcaecati, et consectetur corrupti eos. Ipsum!
                            Architecto porro nemo cum, autem voluptatum odit amet adipisci magni ipsa voluptatem repellat debitis dolores natus veritatis laudantium eligendi repellendus deserunt reiciendis accusamus! Voluptates nisi hic quidem sapiente explicabo nemo!
                            Consequatur commodi, officia est inventore, impedit porro fuga quos nisi, unde sit deserunt tempore cum quod cupiditate? Deleniti porro enim harum, rem repellendus cupiditate quis voluptate ut aut cum architecto!
                            Beatae obcaecati blanditiis magnam temporibus incidunt. Et provident ullam impedit consequatur consectetur, aut id labore adipisci numquam reiciendis atque magnam obcaecati, eligendi maiores veritatis error dignissimos eius odit ut voluptatem!
                            Cumque, tenetur nostrum. Maiores atque necessitatibus beatae alias, culpa veniam numquam voluptatibus iusto, ea nisi, repellendus corrupti laborum! Ratione fugit, incidunt numquam consectetur impedit aspernatur beatae. Nemo hic illo quam!
                        </div>
                        <div className="flex flex-col space-y-2 h-72 overflow-y-scroll rounded-md">
                            {Array(9).fill(null).map((_, index) => {
                              const abcde = String.fromCharCode(65 + index);
                              return (
                                <div key={index} className="flex items-center bg-white p-2 rounded-md ">
                                    <input
                                        type="radio"
                                        name="answer"
                                        id={`answer${index}`}
                                        className="h-6 w-6 mr-4 hidden"
                                    />
                                    <label
                                        htmlFor={`answer${index}`}
                                        className="flex-grow flex items-center px-3 group">
                                        <div className="flex justify-center items-center pr-3">
                                          <span className="radio w-2 h-2  border-black p-2 flex items-center justify-center mr-2 transition-all duration-300 bg-black/50 group-hover:p-2.5" ></span>
                                          <span className="font-semibold">{abcde}. </span>
                                        </div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maiores cumque vitae nam accusantium dignissimos, minus nesciunt voluptatibus soluta ut excepturi quia amet ab magni deleniti voluptatum numquam maxime facere?
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim eum modi aperiam? Iure porro, minima nemo fuga veniam accusamus hic eligendi minus vero officiis pariatur perspiciatis quia! Voluptatum, vitae porro?
                                    </label>
                                </div>
                              )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col w-1/6 bg-purple-100 p-4 space-y-4 my-4 fixed right-0">
                        <div className="bg-purple-200 text-center py-2">daftar soal</div>
                        <div className="grid grid-cols-3 gap-2">
                            {Array(30).fill(null).map((_, index) => (
                                <button key={index} className="bg-white border border-purple-300 h-10 w-10">{index + 1}</button>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-purple-200 p-2 rounded">{"<"}</button>
                            <button className="bg-purple-200 p-2 rounded">{">"}</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default SoalSiswa;
