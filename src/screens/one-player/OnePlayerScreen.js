import './OnePlayerScreen.css'
import React, { useEffect, useState } from 'react'
import { wait } from '@testing-library/user-event/dist/utils';

const adj = [
  { 'l': 10, 'r': 1 },
  { 'l': 0, 'r': 2 },
  { 'l': 1, 'r': 3 },
  { 'l': 2, 'r': 4 },
  { 'l': 3, 'r': 11 },
  { 'l': 6, 'r': 10 },
  { 'l': 7, 'r': 5 },
  { 'l': 8, 'r': 6 },
  { 'l': 9, 'r': 7 },
  { 'l': 11, 'r': 8 },
  { 'l': 5, 'r': 0 },
  { 'l': 4, 'r': 9 }
]
const OnePlayerScreen = () => {
  let oo = 1;
  //for(let i=0;i<2e8;i++){oo ++;oo /= 2;oo +=2;oo %= 2;}

  //setTimeout(()=>{})

  const [valueDanBan, setValueDanBan] = useState([5, 5, 5, 5, 5]);
  const [valueDanMay, setValueDanMay] = useState([5, 5, 5, 5, 5]);
  const [valueQuan, setValueQuan] = useState([1, 1]); 
  const [isQuan, setIsQuan] = useState([1, 1]);
  const [hand, setHand] = useState(0);
  const [scoreBan, setScoreBan] = useState(0);
  const [scoreMay, setScoreMay] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [turn, setTurn] = useState(1);
  const [idx, setIdx] = useState(-1);
  const [direction, setDirection] = useState('?')
  const [taking, setTaking] = useState(0);
  const [skipping, setSkipping] = useState(1)
  const [result, setResult] = useState(['Bạn đã thắng', 'Lmao'])

  //console.log("clickable: " + clickable)
  let play = !clickable
  let instantIndex = idx
  let instantDir = direction
  //console.log(turn)

  //console.log("index: " + idx)
  //console.log("hand: " + hand)
  //console.log("play: " + play)

  // setValueDanBan((id, val)=>{
  //   valueDanBan[id] += val;
  // })

  useEffect(() => {
    magic(idx, direction)
  }, [idx])

  const handleValueDan = (index, value) => {
    //if(value > 100) console.log("yes sir")
    if (index < 5) {
      let tmpArr = [...valueDanBan]
      tmpArr[index] += value
      setValueDanBan(tmpArr)
    }
    else if (index < 10) {
      let tmpArr = [...valueDanMay]
      tmpArr[index - 5] += value
      setValueDanMay(tmpArr)
    }
    else {
      let tmpArr = [...valueQuan]
      tmpArr[index - 10] += value
      setValueQuan(tmpArr)
    }
  }
  const handleScore = (value) => {
    if (turn == 1) {
      setScoreBan(scoreBan + value)
    }
    else {
      setScoreMay(scoreMay + value)
    }
  }
  const handleHand = (value) => {
    setHand(hand + value);
  }
  const handleIsQuan = (index) => {
    let tmpArr = [...isQuan]
    if(tmpArr[index - 10] != 0) {
      //handleScore(100); 
      console.log('an quan');
    }
    tmpArr[index - 10] = 0;
    setIsQuan(tmpArr)
  }
  const getValueDan = (index) => {
    if (index < 5) {
      return valueDanBan[index]
    }
    if (index < 10) {
      return valueDanMay[index - 5]
    }
    return valueQuan[index - 10]
  }
  const checkIndex = (index) => {
    if (getValueDan(index) == 0) return true
  }
  const handleIdx = () =>{
    setIdx(adj[instantIndex][instantDir])
  }

  const reset = () => {
    setClickable(true)
    setTaking(0)
    setSkipping(1)
    setIdx(-1)
  }
  const endTurn = () => {
    console.log("END TURN")
    setTurn(3-turn)
    reset();
  }
  const noQuan = () => {
    return !(isQuan[0] + isQuan[1])
  }
  const endGame = () => {

  }
  const restart = () => {

  }
  const takeable = (index) => {
    if(index < 10) return getValueDan(index);
    if(valueQuan[index-10] < 5 && isQuan[index-10]) return 0;
    handleIsQuan(index);
    if(isQuan) return 5 + getValueDan(index);
    else return getValueDan(index)
  }

  // const magic = (index, dir) => {
  //   console.log("wtf")
  //   console.log(getValueDan(index))
  //   if (checkIndex(index)) {
  //     console.log("vcl");
  //     return;
  //   }
  //   console.log("okok")
  //   setClickable(false);
  //   let play = 1, take = 0, skip = 1;
  //   while (play) {
  //     while (take) {
  //       if (skip) {
  //         if (checkIndex(index)) {
  //           index = adj[index][dir]
  //           skip = 0
  //         }
  //         else {
  //           play = 0;
  //           break;
  //         }
  //       }
  //       else {
  //         if (checkIndex(index)) {
  //           play = 0;
  //           break;
  //         }
  //         else {
  //           handleScore(getValueDan(index));
  //           skip = 1
  //         }
  //       }
  //     }
  //     if (!play) break;

  //     console.log("hand: " + `${hand}`);
  //     while (hand > 0) {
  //       console.log("index:" + index)
  //       wait(5000);
  //       handleHand(-1);
  //       handleValueDan(index, 1);
  //       index = adj[index][dir]
  //     }
  //     if (!checkIndex(index) && index < 10) {
  //       console.log("steal")
  //       handleHand(getValueDan(index));
  //       handleValueDan(index, -getValueDan(index))
  //       index = adj[index][dir]
  //       console.log("index:" + index);
  //       continue;
  //     }
  //     if (getValueDan) {
  //       take = 1;
  //       continue;
  //     }
  //     if (index > 9) {
  //       play = 0;
  //       break;
  //     }
  //   }
  //   setTurn(3 - turn);
  //   setClickable(true);
  // }

  const magic = (index, dir) => {
    if(noQuan()){
      endGame()
    }
    //console.log("magic")
    if(index == -1){
      //console.log("bcz: " + index)
      reset();
      return;
    }
    if(idx == -1 && index != -1){
      setIdx(index)
      //return;
    }
    instantIndex = index
    if(checkIndex(index) && !play) {
      reset();
      return;
    }
    //console.log('yes')
    setClickable(false);
    setDirection(dir);
    instantDir = dir;

    
    let value = getValueDan(index)
    //console.log('da_value' + value)
    if(taking){
      if(skipping){
        if(checkIndex(index)){
          handleIdx()
        }
        else{
          endTurn()
        }
        setSkipping(0)
      }
      else{
        if(checkIndex(index)){
          endTurn()
        }
        else if(takeable(index)){
          handleScore(takeable(index))
          handleValueDan(index, -value)
          handleIdx()
        }
        else{
          endTurn()
        }
        setSkipping(1)
      }
    }

    else if(play){
      if(hand > 0){
        //console.log('huh')
        handleHand(-1)
        handleValueDan(index, 1)
        handleIdx()
        return
      }
      if(!checkIndex(index) && index<10){
        console.log('steal :' + value)
        handleHand(value)
        handleValueDan(index, -value)
        console.log('lmao')
        handleIdx()
        return
      }
      if(checkIndex(index)){
        setTaking(1);
        setSkipping(0)
        handleIdx()
        return;
      }
      if(index > 9){
        endTurn();
        return;
      }
      reset()
    }
  }

  return (
    <div>
      <div className='back'
        onClick={() => {
          //console.log("start")
          //magic(2, 'l');
          //console.log("end")
        }}
      >
        ←
      </div>
      <div className='p2'>
        <div className='info'>
          <div>Máy</div>
          <div>
            Điểm:
            {scoreMay}
          </div>
        </div>
        <div className='win'>
          {result[0]}
        </div>
      </div>
      <div className='outer-board'>
        <div className='board'>
          <div className='nha-quan-l'>
            <div className='o-quan'>

            </div>
            <div className='o-quan-dan'
              onMouseEnter={() => {
                //console.log('hovered');
                let mid = document.getElementById("val-q0")
                mid.classList.remove('hide')
              }}
              onMouseLeave={() => {
                //console.log('left')
                let mid = document.getElementById("val-q0")
                mid.classList.add('hide')

              }}
            >
              <div id="val-q0" className='hide num-inside'>
                {valueQuan[0]}
              </div>
            </div>
          </div>

          {/* -------- khu dan ------------------- */}
          <div className='khu-dan'>
            <div className='nha-dan'>
              {
                valueDanMay.map((value, index) => {
                  let btn_l = 'btn-m' + `(${index})` + '-l';
                  //console.log(btn_l);
                  let btn_r = 'btn-m' + `(${index})` + '-r'
                  let val = 'val-m' + `(${index})`
                  return (
                    <div className='o-dan'
                      onMouseEnter={() => {
                        //console.log('hovered');
                        let l = document.getElementById(btn_l)
                        let mid = document.getElementById(val)
                        let r = document.getElementById(btn_r)

                        l.classList.remove('hide')
                        mid.classList.remove('hide')
                        r.classList.remove('hide')
                      }}
                      onMouseLeave={() => {
                        //console.log('left')
                        let l = document.getElementById(btn_l)
                        let mid = document.getElementById(val)
                        let r = document.getElementById(btn_r)

                        l.classList.add('hide')
                        mid.classList.add('hide')
                        r.classList.add('hide')

                      }}
                    >
                      <div id={btn_l} className='hide num-inside'
                        onClick={() => {
                          //console.log('click left')
                          if(!play && turn == 2) magic(index+5, 'r')
                        }}
                      > {'<'}
                      </div>
                      <div id={val} className='hide num-inside'>
                        {value}
                      </div>
                      <div id={btn_r} className='hide num-inside'
                        onClick={() => {
                          //console.log('click right')
                          if(!play && turn == 2) magic(index+5, 'l')
                        }}
                      > {'>'}
                      </div>
                    </div>
                  )

                })
              }
            </div>
            <div className='nha-dan'>
              {
                valueDanBan.map((value, index) => {
                  let btn_l = 'btn-d' + `(${index})` + '-l';
                  //console.log(btn_l);
                  let btn_r = 'btn-d' + `(${index})` + '-r'
                  let val = 'val-d' + `(${index})`
                  return (
                    <div className='o-dan'
                      onMouseEnter={() => {
                        //console.log('hovered');
                        let l = document.getElementById(btn_l)
                        let mid = document.getElementById(val)
                        let r = document.getElementById(btn_r)

                        l.classList.remove('hide')
                        mid.classList.remove('hide')
                        r.classList.remove('hide')
                      }}
                      onMouseLeave={() => {
                        //console.log('left')
                        let l = document.getElementById(btn_l)
                        let mid = document.getElementById(val)
                        let r = document.getElementById(btn_r)

                        l.classList.add('hide')
                        mid.classList.add('hide')
                        r.classList.add('hide')

                      }}
                    >
                      <div id={btn_l} className='hide num-inside'
                        onClick={() => {
                          //console.log('click left')
                          if(!play && turn == 1) magic(index, 'l')
                        }}
                      > {'<'}
                      </div>
                      <div id={val} className='hide num-inside'>
                        {value}
                      </div>
                      <div id={btn_r} className='hide num-inside'
                        onClick={() => {
                          //console.log('click right')
                          if(!play && turn == 1) magic(index, 'r')
                        }}
                      > {'>'}
                      </div>
                    </div>
                  )

                })
              }
            </div>
          </div>
          <div className='nha-quan-r'>
            <div className='o-quan'>

            </div>
            <div className='o-quan-dan'
              onMouseEnter={() => {
                //console.log('hovered');
                let mid = document.getElementById("val-q1")
                mid.classList.remove('hide')
              }}
              onMouseLeave={() => {
                //console.log('left')
                let mid = document.getElementById("val-q1")
                mid.classList.add('hide')

              }}
            >
              <div id="val-q1" className='hide num-inside'>
                {valueQuan[1]}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p1'>
        <div className='info'>
          <div>Bạn</div>
          <div>
            Điểm:
            {scoreBan}
          </div>
        </div>
        <div className='win'>
          {result[0]}
        </div>
      </div>
    </div>
  )
}

export default OnePlayerScreen