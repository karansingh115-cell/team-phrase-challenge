const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
const phrases=["Top Priority", "Quick Win", "Low-Hanging Fruit", "Key Deliverable", "Focus Area", "Next Steps", "Deep Work", "Put a Pin in It", "High Impact", "Move the Needle", "Momentum", "Get Aligned", "Bite the Bullet", "Be Proactive", "Kick the Can Down the Road", "Collaboration", "Teamwork", "Work Smarter", "Add Value", "Make an Impact", "Remove Roadblocks", "Unblock", "Streamline", "Optimise", "Prioritise", "Think Ahead", "Big Picture", "Strategic Thinking", "Problem Solving", "Continuous Improvement", "Keep It Simple", "Connect the Dots", "Close the Loop", "Follow Through", "One Team", "Raise the Bar", "Make It Happen", "What Matters Most", "Finish Strong", "Herd the Cats", "Circle Back", "Take It Offline", "Think Outside the Box", "Run With It", "Own the Outcome", "Keep Things Moving", "Cut Through the Noise", "Get Things Done", "Stretch Goal", "Bring It Home"];
let available=[...phrases],allocations=[];
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.post("/api/reveal",(req,res)=>{
 const name=String(req.body.name||"").trim();
 if(!name)return res.status(400).json({error:"Please enter your name."});
 if(!available.length)return res.status(409).json({error:"All phrases have been allocated."});
 const i=Math.floor(Math.random()*available.length);
 const phrase=available.splice(i,1)[0];
 allocations.push({name,phrase,at:new Date().toISOString()});
 res.json({name,phrase,remaining:available.length});
});

app.get("/api/status",(req,res)=>{
 res.json({remaining:available.length,total:phrases.length,allocations});
});

app.post("/api/reset",(req,res)=>{
 if(!process.env.ADMIN_KEY||req.query.key!==process.env.ADMIN_KEY)
   return res.status(403).json({error:"Not authorised."});
 available=[...phrases]; allocations=[];
 res.json({ok:true});
});

app.listen(PORT,()=>console.log("Team Phrase Challenge running on port "+PORT));
