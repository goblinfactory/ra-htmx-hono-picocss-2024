import { Hono } from "hono"
import { App } from "@/index.js"

const CityPicker = () => {
    return (
        <>
            <h3>City picker</h3>
            <fieldset>
                <select
                    name="countryCode"
                    hx-get="/controls/city-picker/country"
                    hx-target="#city-picker"
                    hx-swap="outerHTML"
                    hx-trigger="change"
                >
                    <option value="">Select a country</option>
                    <option value="UK">United Kingdom</option>
                    <option value="USA">United States</option>
                    <option value="SA">South Africa</option>
                </select>
                <select id='city-picker' disabled>
                    <option value="">Select a country first</option>
                </select>
            </fieldset>
        </>
    )
}

const citiesMap = new Map<string, string[]>([
    ["UK", ["London", "Manchester", "Edinburgh"]],
    ["USA", ["New York", "Los Angeles", "Chicago"]],
    ["SA", ["Cape Town", "Johannesburg", "Durban"]],
])

const citySelect = (countryCode: string) => {
    return citiesMap.get(countryCode) || []
}


export const initCityPicker = (app: App) => {
    app.get("/controls/city-picker/country", async (c) => {
        const cc = c.req.query('countryCode') || '' as string
        console.log(">> cc:", cc)
        const cities = citySelect(cc)
        if (cities.length === 0) {
            return c.html("<select id='city-picker' disabled><option value=''>Select a country first</option></select>")
        }


        return c.html(<select id='city-picker'>
            {cities.map((city) => <option value="{city}">{city}</option>)}
        </select>)
    })
}

export default CityPicker