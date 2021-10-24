import React from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import FactionQuestion from '../../blob/images/FactionQuestion.png'
import { useHistory } from 'react-router'

const FactionWrapper = styled.div`
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
`

const ImageWrapper = styled.img`
  width:4rem;
  height:4rem;
  cursor:pointer;
`

const CustomImageComponent = (props) => {
  const history = useHistory()
  const exitAnimation = {
    y: 10,
    scale: 1.5,
  }
  return <motion.div
    exit={exitAnimation}
  >
    <ImageWrapper {...props} />
  </motion.div>
}


const TransitionFaction = () => {
  const history = useHistory()
  const [anu, setAnu] = React.useState(true)
  const handleClick = () => {
    // history.push('/faction')
    setAnu(!anu)
  }
  return <>
    <FactionWrapper>
      <AnimatePresence>
        {
          anu
            ?
            <motion.div
              key={anu}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                scale: 3,
                y: "-50%",
                x: "-50%",
                transition: {
                  duration: 2,
                }
              }}
            >
              <ImageWrapper src={FactionQuestion} alt="Faction Question" />
            </motion.div>
            :
            <motion.div
              key={anu}
              initial={{
                opacity: 0,
                scale: 3,
              }}
              animate={{
                opacity: 1,
                scale: 3,
                transition: {
                  delay: 2
                }
              }}
            >
              <ImageWrapper src={FactionQuestion} alt="Faction Question" />
            </motion.div>
        }
      </AnimatePresence>
    </FactionWrapper>

    <br />
    <button onClick={handleClick}>Click</button>
  </>
}

export default TransitionFaction
