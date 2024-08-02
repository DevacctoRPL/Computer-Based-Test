import React, { useState } from "react";

const PostDataForm: React.FC = () => {
    const [nis, setNis] = useState<number | string>("");
    const [sandi, setSandi] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("https://49kdgk28-7772.asse.devtunnels.ms/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nis, sandi })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Success: ${JSON.stringify(data)}`);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage("An error occurred");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nis">NIS:</label>
                    <input
                        type="number"
                        id="nis"
                        value={nis}
                        onChange={(e) => setNis(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sandi">Password:</label>
                    <input
                        type="password"
                        id="sandi"
                        value={sandi}
                        onChange={(e) => setSandi(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PostDataForm;