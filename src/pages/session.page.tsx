import React, { useState } from 'react'
import 'twin.macro'
import tw from 'twin.macro'
import { PageHeader, Parchment } from '../components'
import { ReloadIcon } from '../components/icons'
import { generateLegend } from '../functions/legend.functions'

export const SessionPage = () => {
  const [legend, setLegend] = useState(generateLegend())
  const getLegend = () => setLegend(generateLegend())

  return (
    <div tw="flex flex-col gap-y-8 w-full items-center">
      <PageHeader>Spelmöte</PageHeader>

      <div tw="">
        <div tw="max-w-prose lg:(w-[65ch])">
          <Parchment>
            <button
              tw="flex gap-2 items-center mb-4 hover:text-yellow-500"
              onClick={() => getLegend()}
            >
              <h2 tw="text-4xl text-center flex" className="yx-heading">
                Sägen
              </h2>
              <ReloadIcon container={tw`w-6 h-6`} svg={tw``}></ReloadIcon>
            </button>
            <div>{legend}</div>
          </Parchment>
        </div>
      </div>
    </div>
  )
}
