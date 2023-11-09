import { useForm } from "react-hook-form";
import ModalForm from "./Modal";
import { useState } from "react";

function FormApp() {
    const [modalOpen, setModalOpen] = useState(false)

    const { handleSubmit, register, reset, formState: { errors }, watch } = useForm()

    let perreke = watch()
    const sendForm = handleSubmit(() => {
        setModalOpen(true)
        setTimeout(() => {
            setModalOpen(false)
            reset()
        }, 1000)

    })

    return (<>
        <section style={{ minHeight: "80vh" }} className="d-flex flex-column justify-content-center align-items-center" >
            <h1 className="m-4">Form App to practise React Hook Form</h1>
            <form className="w-50" onSubmit={sendForm}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name && "border-danger"} `}
                        id="name"
                        placeholder="Enter your name"
                        {...register("name",
                            {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                }
                            }
                        )} />
                    {errors.name && <span className="text-danger d-block fs-5">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email && "border-danger"} `}
                        id="email"
                        placeholder="ejemplo@gmail.com"
                        {...register("email",
                            {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid Email"
                                }
                            }
                        )} />
                    {errors.email && <span className="text-danger d-block fs-5">{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password && "border-danger"} `}
                        d="password"
                        {...register("password",
                            {
                                required: {
                                    value: true,
                                    message: "You must enter a password"
                                }

                            }
                        )} />
                    {errors.password && <span className="text-danger d-block fs-5">{errors.password.message}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="c_password">Confirm Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.c_password && "border-danger"} `}
                        id="c_password"
                        {...register("c_password",
                            {
                                required: {
                                    value: true,
                                    message: "You must enter again your password"
                                },
                                validate: (value) => {
                                    let contraseniaActual = value
                                    let contraseniaReal = watch("password")

                                    if (contraseniaReal === contraseniaActual) return true
                                    return "Passwords don´t are equal"
                                }

                            })} />
                    {errors.c_password && <span className="text-danger d-block fs-5">{errors.c_password.message}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="age">Age</label>
                    <input
                        type="date"
                        className={`form-control ${errors.age && "border-danger"} `}
                        id="age"
                        {...register("age",
                            {
                                required: {
                                    value: true,
                                    message: "Age is required"
                                },
                                validate: (value) => {
                                    let userAge = new Date(value)
                                    let actualAge = new Date()
                                    console.log(userAge.getFullYear(), actualAge.getFullYear())
                                    if (actualAge.getFullYear() - userAge.getFullYear() >= 18) return true
                                    return "You must be over 17 "
                                }

                            })} />
                    {errors.age && <span className="text-danger d-block fs-5">{errors.age.message}</span>}
                </div>


                <label htmlFor="country" className="form-label">Country</label>
                <select
                    id="country"
                    className={`form-select ${errors.country && "border-danger"} `}
                    {...register("country",
                        {
                            required: {
                                value: true,
                                message: "Country is required"
                            }

                        })}>
                    <option value="" >-------</option>
                    <option value="arg">Argentina</option>
                    <option value="mex">Mexico</option>
                    <option value="usa">United States</option>
                    <option value="bra">Brazil</option>
                </select>
                {errors.country && <span className="text-danger d-block fs-5">{errors.country.message}</span>}

                <div className="form-check mt-4">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        {...register("terms",
                            {
                                required: {
                                    value: true,
                                    message: "Terms is required"
                                }

                            })} />
                    <label className="form-check-label" htmlFor="terms">
                        Do you accept terms and conditions ?
                    </label>
                    {errors.terms && <span className="text-danger d-block fs-5">{errors.terms.message}</span>}
                </div>

                <button className="btn btn-primary w-50 my-4 mx-auto d-block">Send</button>
            </form>
        </section >
        {modalOpen && <ModalForm />}
    </>);
}

export default FormApp;