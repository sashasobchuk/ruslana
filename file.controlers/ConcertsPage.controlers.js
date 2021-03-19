const ConcertItems = require("../models/Conserts")


class ConcertsControler {
    async getConcertPage(req, res) {
        try {
            let Page = await ConcertItems.find().sort('date')
            res.json({Page: Page})
        } catch (e) {
            res.status(400).json({message: "error in getFotoPage"})
            console.log('error in getFotoPage', e)
        }
    }

    async deleteConcert(req, res) {
        try {
            const {concertItemId} = req.query

            await ConcertItems.findByIdAndRemove(concertItemId)

            return res.status(200).json({message: 'foto deleted'})

        } catch (e) {
            res.json({message: 'error in deleteConcert'})
            console.log('error in deleteConcert', e)
        }
    }

    async addConcertItem(req, res) {
        try {
            const {date, citi, status,isDone} = req.body
            const concertItem = new ConcertItems({
                date: date,
                citi: citi,
                status: status,
                isDone:isDone
            })
            await concertItem.save()
            res.json({message: ' item додали', concertItem})


        } catch (e) {
            res.json({message: 'error in addConcertItem'})
            console.log('error in addConcertItem', e)
        }
    }

    async changeConcertItem(req, res) {
        try {
            const {_id, citi, status, date,IsDone} = req.body

            var concertItem
            if (status !==null) {
                 concertItem = await ConcertItems.findById(_id)
                concertItem.status=status
                await concertItem.save()
            }

            if (citi !== null) {
                 concertItem = await ConcertItems.findById(_id)
                concertItem.citi=citi
                await concertItem.save()
            }

            if (date) {
                 concertItem = await ConcertItems.findById(_id)
                concertItem.date = date
                await concertItem.save()
            }
            if (IsDone) {
                 concertItem = await ConcertItems.findById(_id)
                concertItem.IsDone = IsDone
                await concertItem.save()
            }


            await res.json({message: ' item changed',concertItem})

        } catch (e) {
            res.json({message: 'error in changeConcertItem'})
            console.log('error in changeConcertItem', e)
        }
    }
}


module.exports = new ConcertsControler()
