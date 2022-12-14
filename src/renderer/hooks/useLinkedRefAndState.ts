import { useRef, useState } from "react";

const useLinkedRefAndState = <T>(initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);
  const ref = useRef<T>(initialValue);

  const setRefAndState = (newValue: T) => {
    setState(newValue);
    ref.current = newValue;
  };

  return { state, ref, setRefAndState };
};

export default useLinkedRefAndState;
