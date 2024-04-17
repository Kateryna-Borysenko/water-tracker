import Container from '../../components/common/Container/Container';
import AuthForm from '../../components/forms/AuthForm/AuthForm';
import Meta from '../../components/common/Meta/Meta';
import bottle from '../../assets/static/bottle-for-signin.svg';
import s from './SigninPage.module.css';

const SigninPage = () => {
  return (
    <>
      <Meta title="Sign In Page" />
      <div className={s.container}>
        <Container>
          <div className={s.contentContainer}>
            <AuthForm type="signin" />
            <img src={bottle} className={s.bottle} alt="Bottle of Water" />
          </div>
        </Container>
      </div>
    </>
  );
};

export default SigninPage;
