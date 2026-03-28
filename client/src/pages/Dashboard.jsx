import "../CSS/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-overlay">
      <div className="dashboard-modal">

        <h1>Create New Trip</h1>

        <label>Trip Title</label>
        <input placeholder="e.g., Summer in Santorini" />

        <div className="row">
          <div className="field">
            <label>Country</label>
            <input placeholder="e.g., Greece" />
          </div>

          <div className="field">
            <label>Region</label>
            <input placeholder="e.g., Santorini" />
          </div>
        </div>

        <label>Description</label>
        <textarea placeholder="Describe your trip experience..." />

        <label>Cover Image</label>

        <label className="upload-box">
  <input
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => {
      const file = e.target.files[0];
      console.log(file);
    }}
  />

  <div className="upload-icon">↑</div>
  <p>Upload Cover Image</p>
  <span>Click to browse or drag and drop</span>
</label>

   <label className="checkbox">
  <input type="checkbox" defaultChecked />
  <span className="checkmark"></span>
  <p>Make this trip public</p>
</label>

        <div className="buttons">
          <button className="ai-btn">✨ Create Trip with AI</button>
          <button className="cancel-btn">Cancel</button>
        </div>

      </div>
    </div>
  );
}