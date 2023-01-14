import { useSelector } from "react-redux";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";



function GetComponent(Component) {
    const { user_data } = useSelector((data) => data)
    return user_data.loged ? (
      <Suspense>
        <Component />
      </Suspense>
    ) : (
      <Navigate to="/login" />
    );
  }


export default GetComponent
  