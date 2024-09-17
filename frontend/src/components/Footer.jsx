import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div className="bg-slate-950 dark:bg-gray-200 dark:text-dark-20">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center min-h-96 max-w-6xl mx-5 lg:mx-auto">
            <div className="w-full sm:w-2/5 space-y-5 my-3 sm:my-0">
                <Link to="/" className="flex items-center">
                    <img src="/logo.svg" alt="logo" />
                    <p className="font-bold font-sans ml-2 text-md text-white dark:text-dark-20">store</p>
                </Link>
                <p className="text-gray-20 text-sm dark:text-dark-20">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, justo nec porttitor auctor, erat sapien faucibus lectus, vel tempor dolor augue et lectus. 
                </p>
                <button className="text-indigo-30 px-10 py-3 bg-white dark:bg-dark-20 font-bold text-lg">
                       Login Now
                </button>
            </div>
            <div className="w-full my-3 sm:my-0 sm:w-2/5 sm:mx-4 ">
                <div className="grid grid-cols-3 text-white dark:text-dark-20">
                    <div className="space-y-3">
                        <h3 className="font-bold text-white dark:text-dark-20 text-lg">Home</h3>
                        <div className="space-y-2">
                            <ul>
                                <li>
                                    <Link to={'#'}>Products</Link>
                                </li>
                                <li>
                                    <Link to={'#'}>Categories</Link>    
                                </li>
                                <li> 
                                    <Link to={'#'}>Shop</Link>
                                </li>
                                <li>
                                    <Link to={'#'}>Login</Link>       
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-3">
                    <h3 className="font-bold text-white dark:text-dark-20 text-lg">Shop</h3>
                    <div className="space-y-2">
                        <ul>
                            <li>
                                <Link to={'#'}>T-shirt</Link> 
                            </li>
                            <li>
                                <Link to={'#'}>jacket</Link>
                            </li>
                            <li>
                                <Link to={'#'}>Shirt</Link>
                            </li>
                            <li>
                                <Link to={'#'}>Jens</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-white dark:text-dark-20 text-lg">Categories</h3>
                        <div className="space-y-2">
                            <ul>
                                <li>
                                    <Link to={'#'}>Electronics</Link>
                                </li>
                                <li>
                                    <Link to={'#'}>Jewelery</Link>
                                </li>
                                <li>
                                    <Link to={'#'}>{`Men's clothing`}</Link>
                                </li>
                                <li>
                                    <Link to={'#'}>{`women's clothing`}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-1/5 text-white dark:text-dark-20 my-3 sm:my-0 sm:mb-10">
                    <h3 className="font-bold text-lg">Contact</h3>
                    <div className="space-y-2">
                        <span>Mangcoding@gmail.com</span>
                        <div className="flex space-x-2">
                            <a href="#">
                                facebook
                            </a>
                            <a href="#">
                                twetter
                            </a>
                            <a href="#">
                                linkedin
                            </a>
                            <a href="#">
                                instagram
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}
