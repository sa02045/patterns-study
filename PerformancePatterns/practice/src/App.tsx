import { FixedSizeList as List } from "react-window";
import "./App.css";

const Row = ({
  style,
  index,
}: {
  style: React.CSSProperties;
  index: number;
}) => <div style={style}>Row {index}</div>;

function App() {
  return (
    <>
      <List height={150} itemCount={1000} itemSize={35} width={300}>
        {Row}
      </List>
    </>
  );
}

export default App;
