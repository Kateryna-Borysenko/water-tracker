import Container from '../../components/common/Container/Container';
import AuthForm from '../../components/forms/AuthForm/AuthForm';
import bottle from '../../assets/static/bottle-for-signin.svg';
import s from './SignupPage.module.css';

const SignupPage = () => {
  return (
    <div className={s.container}>
      <Container>
        <div className={s.contentContainer}>
          <AuthForm type="signup" />
          <img src={bottle} className={s.bottle} alt="Bottle of Water" />
        </div>
      </Container>
    </div>
  );
};

export default SignupPage;
