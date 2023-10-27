import './App.css';
import {useEffect, useState} from 'react';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState(""); //account 상태 추가

  useEffect(() => {
    const connectToEthereum = async () => {
      if (typeof window.ethereum !== "undefined") { // window.ethereum 이 있다면
        try{
          // Ethereum 지갑 연결 권한 요청
          await window.ethereum.enable();

          // Ethereum 객체 초기화
          const web = new Web3(window.ethereum);
          setWeb3(web);
        } catch (err) {
          console.log(err);
        }
      } else {
          console.log("MetaMask 또는 Ethereum 지갑을 설치하고 연결하세요.");
      }
    };

    connectToEthereum();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <button
        className="metaConnect"
        onClick={() => {
          connectWallet();
        }}
      >
        connect to MetaMask
      </button>
      {/* 연결된 계정 주소를 화면에 출력합니다.*/}
      <div className="userInfo">주소: {account}</div> 
    </div>
  );
}

export default App;
