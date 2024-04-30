import { withLayout } from "../../components/app/App";
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function ErrorPage(){
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== '/404') {
      navigate('/404')
    }
  }, [navigate, location])
  return (
    <section>
      <div className='container'>
        <h1>Oops! This page not found!!!</h1>
        <Link to='/' variant="primary">
          Go to Home Page
        </Link>
      </div>
    </section>
  );
}

export default withLayout(ErrorPage);