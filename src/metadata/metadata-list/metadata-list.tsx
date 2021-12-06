import Delete from "@mui/icons-material/Delete";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import { EditorMode, useEditorContext } from "../../core/EditorContext";
import { useExtensionContext } from "../../core/ExtensionContext";

export function MetadataList({ className }: { className?: string }) {
  const { field, setField } = useExtensionContext();
  const { selection, setSelection, mode } = useEditorContext();

  const editable = mode !== EditorMode.Initial;

  const updateField = (obj: any, prop: string, value: any) => {
    obj[prop] = value;
    if (setField) {
      setField();
    }
  };

  const deletePoi = () => {
    if (field && setField) {
      field.poi = { } as any;
      setField();
    }
  }

  const deleteHotspot = (index: number) => {
    if (field && field.hotspots && setField) {
      field.hotspots.splice(index, 1);
      setField();
    }
  }

  return (
    <TableContainer>
      <Table aria-label="Metadata List">
        <TableBody>
          {field && field.poi && field.poi.x != null && (
            <TableRow>
              <TableCell component="th">Focal Point</TableCell>
              <TableCell sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
                <div
                    style={{ width: "100%", height: "100%", display: "flex", alignItems:"center" }}
                  >
                  <span style={{flex: '1'}}>
                    {`"x": ${field.poi.x + field.poi.w / 2}, "y": ${
                      field.poi.y + field.poi.h / 2
                    }`}
                  </span>
                  {
                    editable &&
                    <IconButton onClick={() => deletePoi()} sx={{ margin: "2px" }}>
                      <Delete />
                    </IconButton>
                  }
                </div>
              </TableCell>
            </TableRow>
          )}
          {field &&
            field.hotspots &&
            field.hotspots.map((hotspot, index) => (
              <TableRow
                key={index}
                selected={selection === hotspot}
                onClick={() => setSelection(hotspot)}
              >
                <TableCell component="th">Hotspot {index + 1}</TableCell>
                <TableCell sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
                  <div
                    style={{ width: "100%", height: "100%", display: "flex" }}
                  >
                    <TextField
                      label="Target"
                      size="small"
                      variant="standard"
                      sx={{ marginRight: "10px", flex: "1" }}
                      value={hotspot.target}
                      disabled={!editable}
                      onChange={(evt: any) =>
                        updateField(hotspot, "target", evt.target.value)
                      }
                    />
                    <TextField
                      label="Selector"
                      size="small"
                      variant="standard"
                      sx={{ marginLeft: "10px", flex: "1" }}
                      value={hotspot.selector}
                      disabled={!editable}
                      onChange={(evt: any) =>
                        updateField(hotspot, "selector", evt.target.value)
                      }
                    />

                    {
                      editable &&
                      <IconButton sx={{ margin: "2px" }} onClick={() => deleteHotspot(index)}>
                        <Delete />
                      </IconButton>
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))}
          {field &&
            field.polygons &&
            field.polygons.map((polygon, index) => (
              <TableRow
                key={index}
                selected={selection === polygon}
                onClick={() => setSelection(polygon)}
              >
                <TableCell component="th">Polygon {index + 1}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}