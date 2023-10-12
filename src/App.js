import { lazy, Suspense, useEffect } from "react";

/// Components
import Index from "./jsx";
import { connect, useDispatch } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// action
import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function App(props) {
  return (
    <>
      <div
      // className=""
      // style={{
      //   textAlign: "right",
      //   textAlign: "center",
      //   fontSize: "2rem",
      //   margin: "center",
      // }}
      ></div>

      <Suspense
        fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
      >
        <Index />
      </Suspense>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

//export default connect((mapStateToProps)(App));
export default withRouter(connect(mapStateToProps)(App));
