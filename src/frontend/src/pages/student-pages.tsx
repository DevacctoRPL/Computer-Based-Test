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
                    <div className="bg-white p-4 py-12 max-h-[310px] min-h-[310px] overflow-scroll overflow-x-hidden    rounded-md flex items-start justify-center text-center">
                        Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium id dignissimos aut dolores et aliquid voluptatum enim quis atque consequatur ab, corporis, optio iusto repellendus itaque? Possimus alias ea unde.
                        Aliquam esse possimus at. Amet odio ratione doloremque atque, harum recusandae, sunt dolorem itaque quo, consequuntur eligendi officiis suscipit dicta sapiente non nisi? Tempore exercitationem porro odio deleniti at labore.
                        In, officiis! Ipsa officia, vel error reiciendis distinctio eveniet numquam impedit eum soluta illo temporibus suscipit quidem cumque rerum consequuntur eligendi consequatur ipsam, quos aspernatur qui! At commodi fugit ab.
                        Minima facilis iusto expedita voluptates recusandae qui, porro nihil consequuntur illo, consectetur inventore, id ipsa quis blanditiis minus hic. Magni itaque placeat aliquid ipsa id nulla, facilis atque quam ducimus.
                        Dolorum corporis, voluptas reprehenderit nihil nesciunt repellat aperiam. Dignissimos minima nostrum fugiat quo sed officia vel ex quidem aliquam sit et culpa dolore sunt impedit, numquam, consequatur eveniet eos corporis!
                        Distinctio provident asperiores voluptas eaque perspiciatis eos, assumenda dolore quia. Provident quo itaque aperiam adipisci? Necessitatibus ipsam unde voluptas eveniet. Repellat est eius voluptates quisquam magni blanditiis laudantium aliquam non!
                        Debitis omnis eum asperiores perferendis deleniti aliquid consectetur iusto animi quae dolorem, nesciunt nulla eius exercitationem inventore saepe pariatur neque praesentium ea cupiditate earum eos. Quod modi possimus omnis molestiae?
                        Reprehenderit sunt assumenda reiciendis earum, libero ab commodi error non qui voluptas recusandae unde, totam laboriosam doloribus veniam ea. Recusandae, debitis voluptas excepturi odio sequi rem alias doloremque molestiae eius.
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
