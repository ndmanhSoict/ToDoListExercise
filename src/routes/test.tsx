import { createFileRoute } from '@tanstack/react-router';
import InputAuth from '../shared/components/InputAuth';
import ButtonBasic from '../shared/components/ButtonBasic';

export const Route = createFileRoute('/test')({
  component: () => (
    <>
      <InputAuth
        type="text"
        name="username"
        iconleft={<i className="material-icons">mail_outline</i>}
        iconright={<i className="material-icons">visibility</i>}
      />
      <ButtonBasic
        className="px-6"
        title="Submit"
        color="blue"
        onClick={() => console.log('Submitted')}
      />
    </>
  ),
});
