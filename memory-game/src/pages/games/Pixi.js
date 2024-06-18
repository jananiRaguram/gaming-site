import { Stage, Container, Sprite} from '@pixi/react';
import { useTick } from '@pixi/react';
import { useRef, useReducer } from 'react';

const reducer = (_, { data }) => data;
const Bunny = () => {
    const [motion, update] = useReducer(reducer);
    const iter = useRef(0);
  
    useTick((delta) => {
      const i = (iter.current += 0.05 * delta);
  
      update({
        type: 'update',
        data: {
          x: Math.sin(i) * 100,
          y: Math.sin(i / 1.5) * 100,
          rotation: Math.sin(i) * Math.PI,
          anchor: Math.sin(i / 2),
        },
      });
    });
  
    return <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" {...motion} />;
};

const Pixi = () => {
        return (
            <div>
            <p>Here is an example of PIXI rendering a bunny with movement, see code for details.</p>
            <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
            <Container x={150} y={150}>
              <Bunny />
            </Container>
          </Stage>
          </div>
    );
}
export default Pixi;