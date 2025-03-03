import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if(passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
        else {

        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    

    const showPassword = () => {
        if(ref.current.src.includes("icons/eye-off.svg")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eye.svg"
        }
        else {
        passwordRef.current.type = "taxt"
            ref.current.src = "icons/eye-off.svg"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            setform({site: "", username: "", password: ""});
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!')
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id===id)[0])
        setPasswordArray(passwordArray.filter(item => item.id!==id))
    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?")
        if(c) {
            setPasswordArray(passwordArray.filter(item => item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!==id)))
            toast('Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleChange = (e) => {
        setform({...form, [e.target.name]: e.target.value})
    }

    return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className='mycontainer'>
                <h1 className='text-4xl text font-bold text-center'>                
                    <span className="text-green-500">&lt;</span>
                    Password
                    <span className="text-green-500">OP/ &gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className='flex flex-col items-center p-4 text-black gap-8'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' type="text" name='site' id='site' className="rounded-xl border border-green-500 w-full px-4 py-2" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" name='username' id='username' className="rounded-xl border border-green-500 w-full px-4 py-2" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" name='password' id='password' className="rounded-xl border border-green-500 w-full px-4 py-2" />
                            <span className="absolute right-[4px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src='/icons/eye.svg' alt='eye' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900 cursor-pointer'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="password">
                    <h2 className='text-2xl font-bold py-4'>Your Password</h2>
                    {passwordArray.length === 0 && <div> No Password to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='__blank'>{item.site}</a>
                                            <div className='lordiconcopy size-6 cursor-pointer' onClick={()=>{copyText(item.site)}}>
                                                <lord-icon 
                                                    style={{"width":"20px", "height":"20px", "paddingTop":"2px"}}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-6 cursor-pointer' onClick={()=>{copyText(item.username)}}>
                                                <lord-icon 
                                                    style={{"width":"20px", "height":"20px", "paddingTop":"2px"}}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-6 cursor-pointer' onClick={()=>{copyText(item.password)}}>
                                                <lord-icon 
                                                    style={{"width":"20px", "height":"20px", "paddingTop":"2px"}}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center gap-4'>
                                            <span className='cursor-pointer' onClick={() => {editPassword(item.id)}}>
                                            <lord-icon 
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover" 
                                                    style={{"width":"24px", "height":"24px"}}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => {deletePassword(item.id)}}>
                                            <lord-icon 
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover" 
                                                    style={{"width":"24px", "height":"24px"}}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
