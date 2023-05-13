import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";

export default function NavigationMenu() {
    return (
        <Nav variant="pills" defaultActiveKey="/reports" className="flex-column">

            <Nav.Link as={NavLink} to="/customers" activeClassName="active">
                مشتریان
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contracts" activeClassName="active">
                قرارداد ها
            </Nav.Link>
            <Nav.Link as={NavLink} to="/addendums" activeClassName="active">
                الحاقیه ها
            </Nav.Link>
            <Nav.Link as={NavLink} to="/invoices" activeClassName="active">
                صورت حساب
            </Nav.Link>
            <Nav.Link as={NavLink} to="/barrel-types" activeClassName="active">
                تعریف محصول
            </Nav.Link>
        </Nav>
    );
}
