import React from "react";
import { Link } from "react-router-dom";
import {useState} from "react"
const Sidebar = () => {
    const [expand,setExpand]=useState({product:false,category:false})
	const toggleButton=(e)=>{
		if(e.target.className=="productSubmenu")
		setExpand({...expand,product:!expand.product})
	    else setExpand({...expand,category:!expand.category})
	}
	return (
		<div className="sidebar-wrapper">
			<nav id="sidebar">
				<ul className="list-unstyled components mt-4">
					<li>
						<Link to="/dashboard">
							<i className="fa fa-tachometer"></i> Dashboard
						</Link>
					</li>

					<li>
						<a
							href="#productSubmenu"
							className="productSubmenu"
							onClick={toggleButton}
						>
							<i className="fa fa-product-hunt"></i> Products
						</a>
						{expand.product &&
						<ul className="" >
							<li>
								<Link to="/admin/products">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/product">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>}
					</li>
					<li>
						<a
							href="#categorySubmenu"
							className="categorySubmenu"
							onClick={toggleButton}
						>
							<i className="fa fa-product-hunt"></i> Category
						</a>
						{expand.category &&
						<ul className="" id="categorySubmenu">
							<li>
								<Link to="/admin/category">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/category/new">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>}
					</li>

					<li>
						<Link to="/admin/orders">
							<i className="fa fa-shopping-basket"></i> Orders
						</Link>
					</li>

					<li>
						<Link to="/admin/users">
							<i className="fa fa-users"></i> Users
						</Link>
					</li>

					<li>
						<Link to="/admin/reviews">
							<i className="fa fa-star"></i> Reviews
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
